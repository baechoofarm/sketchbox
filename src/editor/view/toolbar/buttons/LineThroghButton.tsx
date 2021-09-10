import React from "react";
import {useSlate} from "slate-react";
import FormatStrikethroughIcon from '@material-ui/icons/FormatStrikethrough';
import {applyLineThroughFormat} from "../../../../internal";
import s from "./EditorButton.scss";

export const LineThroughButton = () => {
    const editor = useSlate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        applyLineThroughFormat(editor);
    };

    return (
        <button className={s.button} onClick={handleClick}>
            <FormatStrikethroughIcon className={s.icon}/>
        </button>
    );
};
