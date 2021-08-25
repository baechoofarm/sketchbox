import {SketchboxElementBase, SketchboxElementType} from "../../internal";

export interface ParagraphElement extends SketchboxElementBase {
    readonly type: SketchboxElementType.PARAGRAPH;
}
