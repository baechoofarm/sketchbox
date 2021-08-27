import {Text, Transforms} from "slate";
import {SketchboxEditor} from "../../../internal";

export function applyBoldFormat(editor: SketchboxEditor) {
    Transforms.setNodes(
        editor,
        {bold: true},
        {match: n => Text.isText(n), split: true}
    );
}
