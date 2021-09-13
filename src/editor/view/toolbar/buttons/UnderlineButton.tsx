import React from "react";
import {useSlate} from "slate-react";
import {UnderlineOutlined} from "@ant-design/icons";
import {applyUnderlineFormat} from "../../../../internal";
import s from "./EditorButton.scss";

export const UnderlineButton = () => {
    const editor = useSlate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        applyUnderlineFormat(editor);
    };

    return (
        <button className={s.button} onClick={handleClick}>
            <UnderlineOutlined className={s.icon}/>
        </button>
    );
};
