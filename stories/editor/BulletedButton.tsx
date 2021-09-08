import React from "react";
import {useSlate} from "slate-react";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import {toggleList, SketchboxElementType} from "../../src/internal";
import s from "./EditorButton.scss";

export const BulletedButton = () => {
    const editor = useSlate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleList(editor, SketchboxElementType.BULLETED);
    };

    return (
        <button onClick={handleClick} className={s.button}>
            <FormatListBulletedIcon className={s.icon}/>
        </button>
    );
};
