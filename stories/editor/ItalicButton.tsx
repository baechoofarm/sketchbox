import React from "react";
import {useSlate} from "slate-react";
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import {applyItalicFormat} from "../../src/editor/formats/italic/italic";
import s from "./EditorButton.scss";

export const ItalicButton = () => {
    const editor = useSlate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        applyItalicFormat(editor);
    };

    return (
        <button className={s.button} onClick={handleClick}>
            <FormatItalicIcon className={s.icon}/>
        </button>
    );
};
