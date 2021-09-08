import React from "react";
import {useSlate} from "slate-react";
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import {toggleList, SketchboxElementType} from "../../src/internal";
import s from "./EditorButton.scss";

export const NumberedButton = () => {
    const editor = useSlate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleList(editor, SketchboxElementType.NUMBERED);
    };

    return (
        <button onClick={handleClick} className={s.button}>
            <FormatListNumberedIcon className={s.icon}/>
        </button>
    );
};
