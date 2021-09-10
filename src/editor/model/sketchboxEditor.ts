import {Editor} from "slate";
import {SketchboxDescendant, SketchboxElement} from "../../internal";

export interface SketchboxEditor extends Editor {
    children: SketchboxDescendant[];
    isInline: (element: SketchboxElement) => boolean;
    isVoid: (element: SketchboxElement) => boolean;
    getFragment: () => SketchboxDescendant[];
}
