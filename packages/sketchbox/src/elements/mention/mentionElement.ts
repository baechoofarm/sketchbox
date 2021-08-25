import {SketchboxText, SketchboxElementBase, SketchboxElementType} from "../../internal";

export interface MentionElement extends SketchboxElementBase {
    readonly type: SketchboxElementType.MENTION;
    character: string;
    value: any;
    children: SketchboxText[];
}
