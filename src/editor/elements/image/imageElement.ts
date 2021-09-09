import {SketchboxElementBase, SketchboxElementType, SketchboxEmptyText} from "../../../internal";

export interface ImageElement extends SketchboxElementBase {
    readonly type: SketchboxElementType.IMAGE;
    url: string;
    width: number;
    height: number;
    children: SketchboxEmptyText[];
}
