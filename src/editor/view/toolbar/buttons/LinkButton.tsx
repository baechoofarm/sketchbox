import React from "react";
import {useSlate} from "slate-react";
import LinkIcon from '@material-ui/icons/Link';
import {insertLink} from "../../../../internal";
import s from "./EditorButton.scss";

export const LinkButton = () => {
    const editor = useSlate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the link: ');
        if (!url) return;
        insertLink(editor, url);
    };

    return (
        <button className={s.button} onClick={handleClick}>
            <LinkIcon className={s.icon}/>
        </button>
    );
};
