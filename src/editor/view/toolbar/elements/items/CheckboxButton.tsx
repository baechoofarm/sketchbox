import React from "react";
import {useSlate} from "slate-react";
import {CheckSquareOutlined} from "@ant-design/icons";
import {SketchboxToolbarButton, toggleCheckbox} from "../../../../../internal";

export const CheckboxButton = () => {
    const editor = useSlate();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        toggleCheckbox(editor);
    };

    return (
        <SketchboxToolbarButton onClick={handleClick}>
            <CheckSquareOutlined/>
        </SketchboxToolbarButton>
    );
};
