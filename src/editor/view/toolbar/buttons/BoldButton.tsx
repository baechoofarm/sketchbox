import React from "react";
import {useSlate} from "slate-react";
import {BoldOutlined} from '@ant-design/icons';
import {applyBoldFormat} from "../../../../internal";
import s from "./EditorButton.scss";

export const BoldButton = () => {
    const editor = useSlate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        applyBoldFormat(editor);
    };

    return (
        <button className={s.button} onClick={handleClick}>
            <BoldOutlined className={s.icon}/>
        </button>
    );
};
