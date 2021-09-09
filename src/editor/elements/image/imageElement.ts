import {SketchboxElementBase, SketchboxElementType, SketchboxEmptyText} from "../../../internal";

export interface ImageElement extends SketchboxElementBase {
    readonly type: SketchboxElementType.IMAGE;
    url: string;
    width: number | null;
    height: number | null;
    children: SketchboxEmptyText[];
}
