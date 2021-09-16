import {Editor, Element, Point, Range, Transforms} from "slate";
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

const getListCounts = (element: SketchboxElement) => {
    const lists = element.children.filter(n => {
        const node = n as SketchboxElement;
        return node.type === SketchboxElementType.LIST;
    });
    return lists.length;
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

        Transforms.wrapNodes(editor, listWrapper);
    }
}

export function cancelNestedList(editor: SketchboxEditor) {
    const isActive = isListActive(editor);
    const isNested = isListNested(editor);
    const {selection} = editor;

    if (isActive && selection && isNested) {
        const node = Editor.parent(editor, selection);
        const parent = Editor.parent(editor, selection, {depth: node[1].length});
        const ancestor = Editor.parent(editor, selection, {depth: node[1].length - 1});

        const parentListCounts = getListCounts(parent[0] as SketchboxElement);
        const ancestorListCounts = getListCounts(ancestor[0] as SketchboxElement);

        if (parentListCounts <= 1) {
            Transforms.unwrapNodes(editor);
        }

        Transforms.removeNodes(editor, {
            at: {path: [...node[1]], offset: 1}
        });

        const path = (ancestorListCounts > 0)
            ? [...ancestor[1], ancestorListCounts - 1, 0]
            : [...ancestor[1], 0];

        if (ancestorListCounts < 1) {
            path[path.length - 2]--;
        }

        const insertPos = Editor.node(editor, {path, offset: 0})[0] as SketchboxText;

        Transforms.insertNodes(editor, node[0], {
            at: {
                path,
                offset: insertPos.text.length
            }
        });
    }
}
