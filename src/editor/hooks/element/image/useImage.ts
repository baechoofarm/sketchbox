import React from "react";
import keycode from "keycode";
import {Transforms} from "slate";
import {isElementActive, ParagraphElement, SketchboxEditor, SketchboxElementType} from "../../../../internal";

export function useImage(editor: SketchboxEditor) {
    const onKeyDown = (event: React.KeyboardEvent) => {
        if (!editor.selection) return;

        switch (event.keyCode) {
            case keycode.codes.enter:
                if (editor.selection && isElementActive(editor, SketchboxElementType.IMAGE)) {
                    Transforms.insertNodes(editor, {
                        type: SketchboxElementType.PARAGRAPH,
                        children: [
                            {text: ""}
                        ]
                    } as ParagraphElement);
                }
                break;
            case keycode.codes.right:
        }
        return false;
    };

    return {onKeyDown};
}
