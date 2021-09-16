import React from "react";
import {EditorModeButton, SketchboxToolbarRow} from "../../../../internal";

interface Props {

}

const SketchboxToolbarModes: React.FC<Props> = () => {
    return (
        <SketchboxToolbarRow>
            <EditorModeButton/>
        </SketchboxToolbarRow>
    );
};

export {SketchboxToolbarModes};
