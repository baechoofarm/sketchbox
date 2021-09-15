import React from "react";
import {SketchboxToolbarRow, BoldButton, ItalicButton, LineThroughButton, UnderlineButton} from "../../../../internal";

const SketchboxToolbarFonts: React.FC = () => {
    return (
        <SketchboxToolbarRow>
            <BoldButton/>
            <ItalicButton/>
            <UnderlineButton/>
            <LineThroughButton/>
        </SketchboxToolbarRow>
    );
};

export {SketchboxToolbarFonts};
