import React from "react";
import {useSlate} from "slate-react";
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import {applyUnderlineFormat} from "../../src/internal";
import s from "./EditorButton.scss";

export const UnderlineButton = () => {
    const editor = useSlate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        applyUnderlineFormat(editor);
    };

    return (
        <button className={s.button} onClick={handleClick}>
            <FormatUnderlinedIcon className={s.icon}/>
        </button>
    );
};
