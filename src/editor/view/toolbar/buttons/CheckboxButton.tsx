import React from "react";
import {useSlate} from "slate-react";
import {CheckSquareOutlined} from "@ant-design/icons";
import {toggleCheckbox} from "../../../../internal";
import s from "./EditorButton.scss";

export const CheckboxButton = () => {
    const editor = useSlate();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        toggleCheckbox(editor);
    };

    return (
        <button onClick={handleClick} className={s.button}>
            <CheckSquareOutlined className={s.icon}/>
        </button>
    );
};
