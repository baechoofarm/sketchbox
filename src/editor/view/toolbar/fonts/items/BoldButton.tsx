import React from "react";
import {useSlate} from "slate-react";
import {BoldOutlined} from '@ant-design/icons';
import {applyBoldFormat, SketchboxToolbarButton} from "../../../../../internal";

export const BoldButton = () => {
    const editor = useSlate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        applyBoldFormat(editor);
    };

    return (
        <SketchboxToolbarButton onClick={handleClick}>
            <BoldOutlined/>
        </SketchboxToolbarButton>
    );
};
