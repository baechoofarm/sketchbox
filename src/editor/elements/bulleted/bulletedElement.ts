import {SketchboxElementBase, SketchboxElementType} from "../../../internal";

export interface BulletedElement extends SketchboxElementBase {
    readonly type: SketchboxElementType.BULLETED;
}
