import React from "react";
import {EditOutlined, ReadOutlined} from "@ant-design/icons";
import {EditorMode, SketchboxToolbarButton, useSketchboxOption} from "../../../../../internal";

interface Props {

}

const EditorModeButton: React.FC<Props> = () => {
    const {isReadMode, onModeChange} = useSketchboxOption();

    const onClick = () => {
        if (isReadMode) onModeChange?.(EditorMode.WRITE);
        else onModeChange?.(EditorMode.READ);
    };

    return (
        <SketchboxToolbarButton onClick={onClick}>
            {isReadMode ? <EditOutlined/> : <ReadOutlined/>}
        </SketchboxToolbarButton>
    );
};

export {EditorModeButton};
