import React from "react";
import {useSlate} from "slate-react";
import {ItalicOutlined} from "@ant-design/icons";
import {applyItalicFormat, SketchboxToolbarButton} from "../../../../../internal";

export const ItalicButton = () => {
    const editor = useSlate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        applyItalicFormat(editor);
    };

    return (
        <SketchboxToolbarButton onClick={handleClick}>
            <ItalicOutlined/>
        </SketchboxToolbarButton>
    );
};
