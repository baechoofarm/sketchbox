import {Editor, Text, Transforms} from "slate";
import {SketchboxEditor, SketchboxText} from "../../internal";

export function createApplyFormatFunc(format: keyof SketchboxText) {
    return (editor: SketchboxEditor) => {
        const [match] = Editor.nodes(editor, {
            match: node => Text.isText(node) && !!node[format]
        });
        Transforms.setNodes(
            editor,
            {[format]: !match},
            {match: node => Text.isText(node), split: true}
        );
    };
}
