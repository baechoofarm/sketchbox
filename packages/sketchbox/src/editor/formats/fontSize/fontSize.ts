import {Range, Text, Transforms} from "slate";
import {SketchboxEditor} from "../../../internal";

export function changeFontSize(size: number, selection: Range | null, editor?: SketchboxEditor) {
    if (editor === undefined || selection === null) return;
    Transforms.select(editor, selection);
    Transforms.setNodes(
        editor,
        {fontSize: size},
        {
            at: {
                anchor: {
                    path: selection.anchor.path,
                    offset: selection.anchor.offset
                },
                focus: {
                    path: selection.focus.path,
                    offset: selection.focus.offset
                }
            },
            match: node => Text.isText(node),
            split: true
        }
    );
}
