import React from "react";
import {useSlate} from "slate-react";
import {LineOutlined, LinkOutlined} from "@ant-design/icons";
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
            <LineOutlined className={s.icon} style={{position: "absolute", zIndex: 10}}/>
            <LinkOutlined className={s.icon}/>
        </button>
    );
};
