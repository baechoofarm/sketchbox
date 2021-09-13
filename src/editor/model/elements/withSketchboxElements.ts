import isUrl from "is-url";
import {Editor, Range, Transforms} from "slate";
import {findCurrentLineRange, insertImage, isImageUrl, SketchboxEditor, SketchboxElement, SketchboxElementType, unwrapLink, wrapLink} from "../../../internal";

export function withSketchboxElements(editor: SketchboxEditor) {
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
        const isLink = (child.type) !== undefined && child.type === SketchboxElementType.LINK;
        if (isLink) {
            if (unit === "character") {
                return unwrapLink(editor);
            }
            return;
        }

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

    editor.insertData = data => {
        const text = data.getData('text/plain');
        const {files} = data;

        if (files?.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                const [mime] = file.type.split('/');

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result as string;
                        insertImage(editor, url);
                    });
                    reader.readAsDataURL(file);
                }
            }
        } else if (isImageUrl(text)) {
            insertImage(editor, text);
        } else if (text && isUrl(text)) {
            wrapLink(editor, text);
        } else {
            insertData(data);
        }
    };

    return editor;
}
