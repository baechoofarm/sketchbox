import React from "react";
import {
    SketchboxToolbarModes,
    SketchboxToolbarFonts,
    SketchboxToolbarElements,
    SketchboxToolbarDivider,
    SketchboxToolbarTextDecorations
} from "../../../internal";
import s from "./sketchboxToolbar.scss";

interface Props {

}

const SketchboxToolbar: React.FC<Props> = () => {
    return (
        <div className={s.toolbar}>
            <SketchboxToolbarModes/>
            <SketchboxToolbarDivider/>
            <SketchboxToolbarFonts/>
            <SketchboxToolbarDivider/>
            <SketchboxToolbarTextDecorations/>
            <SketchboxToolbarDivider/>
            <SketchboxToolbarElements/>
        </div>
    );
};

export {SketchboxToolbar};
