import {Editor, Element, Point, Range, Transforms} from "slate";
import {SketchboxEditor, SketchboxElement, SketchboxElementType} from "../../../../../internal";

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

        Transforms.wrapNodes(editor, listWrapper);
    }
}

export function cancelNestedList(editor: SketchboxEditor) {
    const isNested = isListNested(editor);
    if (!isNested) return;

    const {selection} = editor;
    if (!selection) return;

    const path = selection?.anchor.path ?? [];
    const siblingCounts = path[path.length - 2];

    const dest = path.slice(0, path.length - 1);
    dest[dest.length - 1] = 0;

    if (siblingCounts === 0) {
        Transforms.unwrapNodes(editor);
    }

    const newProps: Partial<SketchboxElement> = {
        type: SketchboxElementType.LIST
    };
    Transforms.setNodes(editor, newProps);
}
