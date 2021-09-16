import React from "react";
import {
    SketchboxToolbarRow,
    FontSizeInput,
    FontFamilySelect
} from "../../../../internal";

const SketchboxToolbarFonts: React.FC = () => {
    return (
        <SketchboxToolbarRow>
            <FontSizeInput/>
            <FontFamilySelect/>
        </SketchboxToolbarRow>
    );
};

export {SketchboxToolbarFonts};
