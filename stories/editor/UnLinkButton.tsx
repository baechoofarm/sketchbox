import React from "react";
import {useSlate} from "slate-react";
import {isLinkActive, unwrapLink} from "../../src/internal";

export const UnLinkButton = () => {
    const editor = useSlate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (isLinkActive(editor)) {
            unwrapLink(editor);
        }
    };

    return (
        <button onClick={handleClick}>
            UnLink
        </button>
    );
};
