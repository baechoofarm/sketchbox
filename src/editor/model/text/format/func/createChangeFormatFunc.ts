import {Range, Text, Transforms} from "slate";
import {SketchboxEditor, SketchboxText} from "../../../../../internal";

export function createChangeFormatFunc(format: keyof SketchboxText) {
    return (value: any, selection: Range | null, editor?: SketchboxEditor) => {
        if (editor === undefined || selection === null) return;

        Transforms.select(editor, selection);

        Transforms.setNodes(
            editor,
            {[format]: value},
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
    };
}
