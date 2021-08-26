import {RenderElementProps} from "slate-react";
import {SketchboxElement} from "sketchbox";

export interface SketchboxElementProps<T extends SketchboxElement = SketchboxElement> extends RenderElementProps {
    element: T;
}
