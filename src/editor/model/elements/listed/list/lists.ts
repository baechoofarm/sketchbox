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

export function checkDeleteList(editor: SketchboxEditor) {
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
                Transforms.setNodes(editor, newProperties, {
                    match: n => !Editor.isEditor(n)
                        && Element.isElement(n)
                        && (n.type === SketchboxElementType.BULLETED || n.type === SketchboxElementType.NUMBERED || n.type === SketchboxElementType.LIST)
                });
            }
        }
    }
}

export function applyNestedList(editor: SketchboxEditor) {
    const isActive = isListActive(editor);

    if (isActive) {
        const [match] = Editor.nodes(editor, {
            match: n => !Editor.isEditor(n)
                && Element.isElement(n)
                && (n.type === SketchboxElementType.BULLETED)
        });

        const type = match ? SketchboxElementType.BULLETED : SketchboxElementType.NUMBERED;

        const listWrapper: {type: SketchboxElementType.BULLETED | SketchboxElementType.NUMBERED, children: any[]} = {type, children: []};
        Transforms.wrapNodes(editor, listWrapper);
    }
}