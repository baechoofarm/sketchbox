import {Editor, Element, Point, Range, Transforms} from "slate";
import {ReactEditor} from "slate-react";
import {SketchboxEditor, SketchboxElement, SketchboxElementType, SketchboxText} from "../../../../../internal";

const isListActive = (editor: SketchboxEditor) => {
    const [match] = Editor.nodes(editor, {
        match: n => !Editor.isEditor(n)
            && Element.isElement(n)
            && (n.type === SketchboxElementType.NUMBERED || n.type === SketchboxElementType.BULLETED),
    });

    return !!match;
};

const isListNested = (editor: SketchboxEditor) => {
    const {selection} = editor;

    if (selection) {
        const node = Editor.parent(editor, selection);
        const parent = Editor.parent(editor, selection, {depth: node[1].length - 1});
        const parentNode = parent[0] as SketchboxElement;

        if (parentNode && (parentNode.type === SketchboxElementType.BULLETED || parentNode.type === SketchboxElementType.NUMBERED)) {
            return true;
        }
    }

    return false;
};

const getListType = (editor: SketchboxEditor) => {
    const [match] = Editor.nodes(editor, {
        match: n => !Editor.isEditor(n)
            && Element.isElement(n)
            && (n.type === SketchboxElementType.BULLETED)
    });

    return match ? SketchboxElementType.BULLETED : SketchboxElementType.NUMBERED;
};

export const toggleList = (editor: SketchboxEditor, type: SketchboxElementType) => {
    const isActive = isListActive(editor);

    Transforms.unwrapNodes(editor, {
        match: n => (
            !Editor.isEditor(n) && Element.isElement(n)
            && (n.type === SketchboxElementType.BULLETED || n.type === SketchboxElementType.NUMBERED)
        ),
        split: true
    });

    const newProperties: Partial<SketchboxElement> = {
        type: isActive ? SketchboxElementType.PARAGRAPH : SketchboxElementType.LIST
    };

    Transforms.setNodes(editor, newProperties);

    if (!isActive && (type === SketchboxElementType.BULLETED || type === SketchboxElementType.NUMBERED)) {
        const listWrapper = {type, children: []};

        Transforms.wrapNodes(editor, listWrapper);
    }
};

export function checkDeleteList(editor: SketchboxEditor): boolean {
    const {selection} = editor;

    if (selection && Range.isCollapsed(selection)) {
        const [match] = Editor.nodes(editor, {
            match: n => !Editor.isEditor(n)
                && Element.isElement(n)
                && (n.type === SketchboxElementType.BULLETED || n.type === SketchboxElementType.NUMBERED || n.type === SketchboxElementType.LIST)
        });

        if (match) {
            const [, path] = match;
            const start = Editor.start(editor, path);

            if (Point.equals(selection.anchor, start)) {
                const newProperties: Partial<SketchboxElement> = {
                    type: SketchboxElementType.PARAGRAPH
                };

                Transforms.unwrapNodes(editor, {
                    match: n => !Editor.isEditor(n)
                        && Element.isElement(n)
                        && n.type === SketchboxElementType.LIST
                });

                Transforms.setNodes(editor, newProperties, {
                    match: n => !Editor.isEditor(n)
                        && Element.isElement(n)
                        && (n.type === SketchboxElementType.BULLETED || n.type === SketchboxElementType.NUMBERED)
                });

                return true;
            }
        }
    }
    return false;
}

export function applyNestedList(editor: SketchboxEditor) {
    const isActive = isListActive(editor);

    if (isActive) {
        const type = getListType(editor);
        const listWrapper: { type: SketchboxElementType.BULLETED | SketchboxElementType.NUMBERED, children: any[] } = {type, children: []};

        if (type === SketchboxElementType.BULLETED) Transforms.wrapNodes(editor, listWrapper);

        const {selection} = editor;
        if (!selection) return;

        const {path} = selection.anchor;
        if (path[path.length - 2] === 0) return;

        const node = Editor.parent(editor, selection);
        const wrapper = Editor.parent(editor, selection, {depth: node[1].length});

        const index = wrapper[0].children.findIndex(v => v === node[0]);
        const upperNode = wrapper[0].children[index - 1] as SketchboxElement;

        if (!upperNode || (upperNode as Element).type !== SketchboxElementType.NUMBERED) {
            Transforms.wrapNodes(editor, listWrapper);
            return;
        }

        Transforms.removeNodes(editor);

        const upperPath = ReactEditor.findPath(editor, upperNode.children[upperNode.children.length - 1]);
        Transforms.select(editor, upperPath);
        if (!editor.selection) return;

        const insertPath = editor.selection.anchor.path.slice();
        insertPath[insertPath.length - 2]++;
        insertPath.splice(insertPath.length - 1, 1);

        Transforms.insertNodes(editor, node[0], {
            at: insertPath
        });
    }
}

export function cancelNestedList(editor: SketchboxEditor) {
    const isNested = isListNested(editor);
    if (!isNested) return;

    const {selection} = editor;
    if (!selection) return;

    const node = Editor.parent(editor, selection);
    const wrapper = Editor.parent(editor, selection, {depth: node[1].length});
    if ((wrapper[0] as SketchboxElement).type === SketchboxElementType.BULLETED) {
        Transforms.unwrapNodes(editor);

        const newProps: Partial<SketchboxElement> = {
            type: SketchboxElementType.LIST
        };
        Transforms.setNodes(editor, newProps);
    } else if ((wrapper[0] as SketchboxElement).type === SketchboxElementType.NUMBERED) {
        const {path} = selection.anchor;
        const test = path.slice();

        test.pop();
        test[test.length - 1] = 0;
        test[test.length - 2]++;

        if (wrapper[0].children.length === 1) {
            Transforms.unwrapNodes(editor);

            const newProps: Partial<SketchboxElement> = {
                type: SketchboxElementType.LIST
            };
            Transforms.setNodes(editor, newProps);

            test[test.length - 2]--;
        } else {
            Transforms.removeNodes(editor);

            Transforms.select(editor, {offset: 0, path: test});
            editor.insertBreak();

            Transforms.select(editor, {offset: 0, path: test});
            editor.insertText((node[0].children[0] as SketchboxText).text);
        }
    }
}
