import React from "react";
import {SketchboxToolbarModes, SketchboxToolbarFonts, SketchboxToolbarElements, SketchboxToolbarDivider} from "../../../internal";
import s from "./sketchboxToolbar.scss";

interface Props {
    isReadMode?: boolean;

    onIsModeChange(isReadMode: boolean): void;
}

const SketchboxToolbar: React.FC<Props> = props => {
    const {isReadMode, onIsModeChange} = props;

    return (
        <div className={s.toolbar}>
            <SketchboxToolbarModes isReadMode={isReadMode} onIsModeChange={onIsModeChange}/>
            <SketchboxToolbarDivider/>
            <SketchboxToolbarFonts/>
            <SketchboxToolbarDivider/>
            <SketchboxToolbarElements/>
        </div>
    );
};

export {SketchboxToolbar};
