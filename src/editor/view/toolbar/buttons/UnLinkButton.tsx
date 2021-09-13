import React from "react";
import {useSlate} from "slate-react";
import {DisconnectOutlined} from "@ant-design/icons";
import {isLinkActive, unwrapLink} from "../../../../internal";
import s from "./EditorButton.scss";

export const UnLinkButton = () => {
    const editor = useSlate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (isLinkActive(editor)) {
            unwrapLink(editor);
        }
    };

    return (
        <button onClick={handleClick} className={s.button}>
            <DisconnectOutlined className={s.icon}/>
        </button>
    );
};
