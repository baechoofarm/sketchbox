import React from "react";
import {BoldButton, ItalicButton, LineThroughButton, SketchboxToolbarRow, UnderlineButton} from "../../../../internal";

const SketchboxToolbarTextDecorations: React.FC = () => {
    return (
        <SketchboxToolbarRow>
            <BoldButton/>
            <ItalicButton/>
            <UnderlineButton/>
            <LineThroughButton/>
        </SketchboxToolbarRow>
    );
};

export {SketchboxToolbarTextDecorations};
