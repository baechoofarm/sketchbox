import {Editor, Element, Transforms} from "slate";
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
