import {SketchboxElementBase, SketchboxElementType} from "../../../internal";

export interface ListElement extends SketchboxElementBase {
    readonly type: SketchboxElementType.LIST;
}
