import React from "react";
import {useSlate} from "slate-react";
import {StrikethroughOutlined} from "@ant-design/icons";
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
            <StrikethroughOutlined className={s.icon}/>
        </button>
    );
};
