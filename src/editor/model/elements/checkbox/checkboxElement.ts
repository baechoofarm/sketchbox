import {SketchboxElementBase, SketchboxElementType} from "../../../../internal";

export interface CheckboxElement extends SketchboxElementBase {
    readonly type: SketchboxElementType.CHECKBOX;
    checked: boolean;
}
