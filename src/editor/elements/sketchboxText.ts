import {BaseText} from "slate";

interface FormatText extends BaseText{
    fontSize?: number;
    fontFamily?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    lineThrough?: boolean;
}

export interface SketchboxText extends FormatText {}

export interface SketchboxEmptyText extends FormatText {}
