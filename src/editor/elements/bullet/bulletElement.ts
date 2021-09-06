import {SketchboxElementBase, SketchboxElementType} from "../../../internal";

export interface BulletElement extends SketchboxElementBase {
    readonly type: SketchboxElementType.BULLET;
}
