import React from "react";
import {useSlate} from "slate-react";
import {insertLink} from "../../src/editor/elements/link/links";

export const LinkButton = () => {
    const editor = useSlate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the link: ');
        if (!url) return;
        insertLink(editor, url);
    };

    return (
        <button onClick={handleClick}>
            Link
        </button>
    );
};
