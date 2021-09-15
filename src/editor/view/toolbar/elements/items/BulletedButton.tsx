import React from "react";
import {useSlate} from "slate-react";
import {UnorderedListOutlined} from "@ant-design/icons";
import {toggleList, SketchboxElementType, SketchboxToolbarButton} from "../../../../../internal";

export const BulletedButton = () => {
    const editor = useSlate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleList(editor, SketchboxElementType.BULLETED);
    };

    return (
        <SketchboxToolbarButton onClick={handleClick}>
            <UnorderedListOutlined/>
        </SketchboxToolbarButton>
    );
};
