import React from "react";
import {EditOutlined, ReadOutlined} from "@ant-design/icons";
import {SketchboxToolbarButton} from "../../common/SketchboxToolbarButton";

interface Props {
    isReadMode?: boolean;

    onIsModeChange(isReadMode: boolean): void;
}

const EditorModeButton: React.FC<Props> = ({isReadMode, onIsModeChange}) => {
    const onClick = () => {
        onIsModeChange(!isReadMode);
    };

    return (
        <SketchboxToolbarButton onClick={onClick}>
            {isReadMode ? <EditOutlined/> : <ReadOutlined/>}
        </SketchboxToolbarButton>
    );
};

export {EditorModeButton};
