import {RenderElementProps} from "slate-react";
import {SketchboxElement} from "../../../internal";

export interface SketchboxElementProps<T extends SketchboxElement = SketchboxElement> extends RenderElementProps {
    element: T;
}
