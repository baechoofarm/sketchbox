import {BaseText} from "slate";

interface SketchboxFormatText extends BaseText {
    fontSize?: number;
    fontFamily?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    lineThrough?: boolean;
}

export interface SketchboxText extends SketchboxFormatText {}

export interface SketchboxEmptyText extends SketchboxFormatText {}
