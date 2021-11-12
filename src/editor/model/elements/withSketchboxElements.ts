import isUrl from "is-url";
import {Editor, Node, Range, Transforms} from "slate";
import {
    checkDeleteCheckbox,
    checkDeleteList, checkIsBetweenLists,
    findCurrentLineRange, imageUrlToBlob,
    insertImage, insertTempImage,
    isImageUrl,
    SketchboxEditor,
    SketchboxElement,
    SketchboxElementType, SketchboxOption,
    unwrapLink,
    wrapLink
} from "../../../internal";

export function withSketchboxElements(editor: SketchboxEditor, option: SketchboxOption) {
    const {
        insertData,
        insertText,
        isInline,
        isVoid
    } = editor;

    const {deleteBackward} = editor;

    editor.isInline = element => {
        switch (element.type) {
            case SketchboxElementType.LINK:
            case SketchboxElementType.MENTION:
                return true;
        }
        return isInline(element);
    };

    editor.insertText = text => {
        if (text.length < 1) {
            editor.deleteBackward("block");
            return;
        }

        const splits = text.split(" ");
        const hasUrl = splits.find(split => isUrl(split));
        if (hasUrl) {
            splits.forEach((split, index) => {
                if (isUrl(split)) {
                    if (index !== 0 && !isUrl(splits[index - 1])) {
                        insertText(" ");
                    }
                    wrapLink(editor, split);
                    if (index !== splits.length - 1) {
                        insertText(" ");
                    }
                } else {
                    insertText(split);
                }
            });
            return;
        }

        if (text && isUrl(text)) {
            wrapLink(editor, text);
        } else if (text.length >= 1) {
            insertText(text);
        }
    };

    editor.isVoid = element => {
        switch (element.type) {
            case SketchboxElementType.MENTION:
            case SketchboxElementType.IMAGE:
                return true;
        }
        return isVoid(element);
    };

    editor.deleteBackward = (unit: "character" | "word" | "line" | "block"): void => {
        const element = editor.getFragment()[0] as SketchboxElement;
        const child = element.children[0] as SketchboxElement;

        const isCheckbox = checkDeleteCheckbox(editor);
        const isList = checkDeleteList(editor);
        if (isCheckbox || isList) {
            return;
        }

        const isLink = (child.type) !== undefined && child.type === SketchboxElementType.LINK;
        if (isLink) {
            if (unit === "character") {
                return unwrapLink(editor);
            }
            return;
        }

        if (checkIsBetweenLists(editor)) return;

        if (unit !== 'line') {
            return deleteBackward(unit);
        }

        if (editor.selection && Range.isCollapsed(editor.selection)) {
            const parentBlockEntry = Editor.above(editor, {
                match: n => Editor.isBlock(editor, n),
                at: editor.selection,
            });

            if (parentBlockEntry) {
                const [, parentBlockPath] = parentBlockEntry;
                const parentElementRange = Editor.range(
                    editor,
                    parentBlockPath,
                    editor.selection.anchor
                );

                const currentLineRange = findCurrentLineRange(editor, parentElementRange);

                if (!Range.isCollapsed(currentLineRange)) {
                    Transforms.delete(editor, {at: currentLineRange});
                }
            }
        }
    };

    editor.insertBreak = () => {
        const {selection} = editor;
        if (!selection) return;

        const node = Editor.parent(editor, selection);
        const wrapper = Editor.parent(editor, selection, {depth: node[1].length});
        if (wrapper[1].length < 1) {
            return Transforms.splitNodes(editor, {always: true});
        }

        const parent = Editor.parent(editor, selection, {depth: node[1].length - 1});
        const parentType = (parent[0] as SketchboxElement).type;

        if (parentType === SketchboxElementType.BULLETED) {
            const listNode: Node = {type: SketchboxElementType.LIST, children: [{text: ""}]};

            const dest = [wrapper[1][0], wrapper[1][1]];
            dest[dest.length - 1]++;

            Transforms.insertNodes(editor, listNode, {
                at: dest
            });
            Transforms.select(editor, dest);

            const listWrapper: { type: SketchboxElementType.BULLETED, children: any[] } = {
                type: parentType,
                children: []
            };

            for (let i = node[1].length; i > 2; i--) {
                Transforms.wrapNodes(editor, listWrapper);
            }
        } else {
            Transforms.splitNodes(editor, {always: true});
        }
    };

    editor.insertData = data => {
        const text = data.getData('text/plain');
        const {files} = data;

        if (files?.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const [mime] = file.type.split('/');

                if (mime === 'image') {
                    if (option.onImageTempUpload) {
                        insertTempImage(editor, file, option.onImageTempUpload);
                    } else {
                        insertImage(editor, file);
                    }
                }
            }
        } else if (isImageUrl(text)) {
            imageUrlToBlob(text).then(image => insertImage(editor, image));
        } else if (text && isUrl(text)) {
            wrapLink(editor, text);
        } else {
            insertData(data);
        }
    };

    return editor;
}
