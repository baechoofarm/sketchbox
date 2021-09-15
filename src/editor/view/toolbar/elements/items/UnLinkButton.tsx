import React from "react";
import {useSlate} from "slate-react";
import {DisconnectOutlined} from "@ant-design/icons";
import {isLinkActive, SketchboxToolbarButton, unwrapLink} from "../../../../../internal";

export const UnLinkButton = () => {
    const editor = useSlate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (isLinkActive(editor)) {
            unwrapLink(editor);
        }
    };

    return (
        <SketchboxToolbarButton onClick={handleClick}>
            <DisconnectOutlined/>
        </SketchboxToolbarButton>
    );
};
