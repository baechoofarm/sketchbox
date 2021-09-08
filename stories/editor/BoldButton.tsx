import React from "react";
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import {useSlate} from "slate-react";
import {applyBoldFormat} from "../../src/internal";
import s from "./EditorButton.scss";

export const BoldButton = () => {
    const editor = useSlate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        applyBoldFormat(editor);
    };

    return (
        <button className={s.button} onClick={handleClick}>
            <FormatBoldIcon className={s.icon}/>
        </button>
    );
};
