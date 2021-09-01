import {SketchboxElementBase, SketchboxElementType} from "../../../internal";

export interface LinkElement extends SketchboxElementBase {
    readonly type: SketchboxElementType.LINK;
    url: string;
}
