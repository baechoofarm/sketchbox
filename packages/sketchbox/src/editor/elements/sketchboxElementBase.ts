import {BaseElement} from "slate";
import {SketchboxDescendant, SketchboxElementType} from "../../internal";

export interface SketchboxElementBase extends BaseElement {
    readonly type: SketchboxElementType;
    children: SketchboxDescendant[];
}
