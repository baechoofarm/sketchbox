import {SketchboxElementBase, SketchboxElementType} from "../../../../internal";

export interface NumberedElement extends SketchboxElementBase {
    readonly type: SketchboxElementType.NUMBERED;
}
