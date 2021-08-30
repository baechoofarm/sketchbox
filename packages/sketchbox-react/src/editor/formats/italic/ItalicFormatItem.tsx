import React from "react";
import {SketchboxFormatProps} from "../sketchboxFormatProps";
import s from "./italicFormatItem.scss";

export const ItalicFormatItem: React.FC<SketchboxFormatProps> = ({attributes, children}) => (
    <span
        className={s.italicItem}
        {...attributes}
    >
        {children}
    </span>
);
