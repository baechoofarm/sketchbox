import React from "react";
import {SketchboxFormatProps} from "../sketchboxFormatProps";
import s from "./boldFormatItem.scss";

export const BoldFormatItem: React.FC<SketchboxFormatProps> = ({attributes, children}) => {
    return (
        <span
            className={s.boldItem}
            {...attributes}
        >
            {children}
        </span>
    );
};
