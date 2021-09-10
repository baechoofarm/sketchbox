import React from "react";
import {useSlate} from "slate-react";
import LinkOffIcon from '@material-ui/icons/LinkOff';
import {isLinkActive, unwrapLink} from "../../src/main";
import s from "./EditorButton.scss";

export const UnLinkButton = () => {
    const editor = useSlate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (isLinkActive(editor)) {
            unwrapLink(editor);
        }
    };

    return (
        <button onClick={handleClick} className={s.button}>
            <LinkOffIcon className={s.icon}/>
        </button>
    );
};
