import React from "react";
import {useSlate} from "slate-react";
import {StrikethroughOutlined} from "@ant-design/icons";
import {applyLineThroughFormat, SketchboxToolbarButton} from "../../../../../internal";

export const LineThroughButton = () => {
    const editor = useSlate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        applyLineThroughFormat(editor);
    };

    return (
        <SketchboxToolbarButton onClick={handleClick}>
            <StrikethroughOutlined/>
        </SketchboxToolbarButton>
    );
};
