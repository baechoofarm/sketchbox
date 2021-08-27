import {Editor, Text, Transforms} from "slate";
import {SketchboxEditor} from "../../../internal";

export function applyBoldFormat(editor: SketchboxEditor) {
    const [match] = Editor.nodes(editor, {
        match: node => Text.isText(node) && !!node.bold
    });
    Transforms.setNodes(
        editor,
        {bold: !match},
        {match: n => Text.isText(n), split: true}
    );
}
