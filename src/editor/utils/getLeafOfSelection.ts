import {Editor, NodeEntry} from "slate";
import {SketchboxEditor, SketchboxEmptyText, SketchboxText} from "../../internal";

export function getLeafOfSelection(editor: SketchboxEditor): NodeEntry<SketchboxText | SketchboxEmptyText> | null {
    const {selection} = editor;
    let leaf = null;
    if (selection !== null) {
        try {
            leaf = Editor.leaf(editor, selection);
        } catch (e) {
            return leaf;
        }
    }
    return leaf;
}
