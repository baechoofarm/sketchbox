import React from "react";
import {useSlate} from "slate-react";
import {ItalicOutlined} from "@ant-design/icons";
import {applyItalicFormat} from "../../../model/text/format/formats/italic";
import s from "./EditorButton.scss";

export const ItalicButton = () => {
    const editor = useSlate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        applyItalicFormat(editor);
    };

    return (
        <button className={s.button} onClick={handleClick}>
            <ItalicOutlined className={s.icon}/>
        </button>
    );
};
