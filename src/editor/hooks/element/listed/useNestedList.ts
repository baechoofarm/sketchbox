import React from "react";
import {applyNestedList, cancelNestedList} from "../../../model/elements/listed/list/lists";
import {SketchboxEditor} from "../../../model/sketchboxEditor";

export function useNestedList(editor: SketchboxEditor) {
    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.shiftKey && event.key === "Tab") {
            event.preventDefault();
            cancelNestedList(editor);
            return true;
        }
        if (event.key === "Tab") {
            event.preventDefault();
            applyNestedList(editor);
            return true;
        }
    };

    return {onKeyDown};
}
