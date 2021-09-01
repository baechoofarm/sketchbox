import {SketchboxElementBase, SketchboxElementType, SketchboxEmptyText} from "../../../internal";

export interface ImageElement extends SketchboxElementBase {
    readonly type: SketchboxElementType.IMAGE;
    url: string;
    children: SketchboxEmptyText[];
}
