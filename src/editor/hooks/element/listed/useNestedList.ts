import React from "react";
import {useSlate} from "slate-react";
import {applyNestedList, cancelNestedList} from "../../../model/elements/listed/list/lists";

export function useNestedList() {
    const editor = useSlate();

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
