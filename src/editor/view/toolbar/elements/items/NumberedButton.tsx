import React from "react";
import {useSlate} from "slate-react";
import {OrderedListOutlined} from "@ant-design/icons";
import {toggleList, SketchboxElementType, SketchboxToolbarButton} from "../../../../../internal";

export const NumberedButton = () => {
    const editor = useSlate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleList(editor, SketchboxElementType.NUMBERED);
    };

    return (
        <SketchboxToolbarButton onClick={handleClick}>
            <OrderedListOutlined/>
        </SketchboxToolbarButton>
    );
};
