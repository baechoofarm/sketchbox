import React from "react";
import {EditorModeButton, SketchboxToolbarRow} from "../../../../internal";

interface Props {
    isReadMode?: boolean;

    onIsModeChange(isReadMode: boolean): void;
}

const SketchboxToolbarModes: React.FC<Props> = ({isReadMode, onIsModeChange}) => {
    return (
        <SketchboxToolbarRow>
            <EditorModeButton isReadMode={isReadMode} onIsModeChange={onIsModeChange}/>
        </SketchboxToolbarRow>
    );
};

export {SketchboxToolbarModes};
