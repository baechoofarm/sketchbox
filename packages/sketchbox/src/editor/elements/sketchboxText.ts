import {BaseText} from "slate";

export interface SketchboxText extends BaseText {
    fontSize?: number;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    lineThrough?: boolean;
}

export interface SketchboxEmptyText extends BaseText {
    fontSize?: number;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    lineThrough?: boolean;
}
