import React from "react";
import {useSlate} from "slate-react";
import {LinkOutlined} from "@ant-design/icons";
import {insertLink, SketchboxToolbarButton} from "../../../../../internal";

export const LinkButton = () => {
    const editor = useSlate();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the link: ');
        if (!url) return;
        insertLink(editor, url);
    };

    return (
        <SketchboxToolbarButton onClick={handleClick}>
            <LinkOutlined/>
        </SketchboxToolbarButton>
    );
};
