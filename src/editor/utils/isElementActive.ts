import {Editor, Element as SlateElement} from "slate";
import {SketchboxElementType} from "../../internal";

export function isElementActive(editor: Editor, ...types: SketchboxElementType[]) {
    const [match] = Editor.nodes(editor, {
        match: n => (
            !Editor.isEditor(n)
            && SlateElement.isElement(n)
            && types?.some(type => type === n.type)
        )
    });
    return !!match;
}
