import React from "react";
import {useSlate} from "slate-react";
import {LinkOutlined} from "@ant-design/icons";
import {insertLink} from "../../../../internal";
import s from "./EditorButton.scss";

export const LinkButton = () => {
    const editor = useSlate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the link: ');
        if (!url) return;
        insertLink(editor, url);
    };

    return (
        <button className={s.button} onClick={handleClick}>
            <LinkOutlined className={s.icon}/>
        </button>
    );
};
