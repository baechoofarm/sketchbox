import {Editor, Element, Point, Range, Transforms} from "slate";
import {SketchboxEditor, SketchboxElement, SketchboxElementType} from "../../../../internal";

export function isCheckboxActive(editor: SketchboxEditor) {
    const [checkbox] = Editor.nodes(editor, {
        match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === SketchboxElementType.CHECKBOX
    });
    return !!checkbox;
}

export function unsetCheckbox(editor: SketchboxEditor) {
    const newProperties: Partial<SketchboxElement> = {
        type: SketchboxElementType.PARAGRAPH
    };
    Transforms.setNodes(editor, newProperties);
}

export function toggleCheckbox(editor: SketchboxEditor) {
    if (isCheckboxActive(editor)) {
        return unsetCheckbox(editor);
    }

    const newProperties: Partial<SketchboxElement> = {
        type: SketchboxElementType.CHECKBOX,
        checked: false
    };
    Transforms.setNodes(editor, newProperties);
}

export function checkDeleteChecklist(editor: SketchboxEditor) {
    const {selection} = editor;

    if (selection && Range.isCollapsed(selection)) {
        const [match] = Editor.nodes(editor, {
            match: n => !Editor.isEditor(n)
                && Element.isElement(n)
                && n.type === SketchboxElementType.CHECKBOX
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
                        && n.type === SketchboxElementType.CHECKBOX
                });
            }
        }
    }
}
