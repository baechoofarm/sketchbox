import {BaseText} from "slate";

export interface SketchboxText extends BaseText {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    lineThrough?: boolean;
}

export interface SketchboxEmptyText extends BaseText {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    lineThrough?: boolean;
}
