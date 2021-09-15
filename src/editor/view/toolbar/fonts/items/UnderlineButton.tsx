import React from "react";
import {useSlate} from "slate-react";
import {UnderlineOutlined} from "@ant-design/icons";
import {applyUnderlineFormat, SketchboxToolbarButton} from "../../../../../internal";

export const UnderlineButton = () => {
    const editor = useSlate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        applyUnderlineFormat(editor);
    };

    return (
        <SketchboxToolbarButton onClick={handleClick}>
            <UnderlineOutlined/>
        </SketchboxToolbarButton>
    );
};
