import {SketchboxElementBase, SketchboxElementType} from "../../../internal";

export interface TextElement extends SketchboxElementBase {
    readonly type: SketchboxElementType.TEXT;
}
