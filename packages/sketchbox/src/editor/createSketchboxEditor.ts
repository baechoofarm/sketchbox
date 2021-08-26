import {createEditor} from "slate";
import {withHistory} from "slate-history";
import {SketchboxEditor} from "../internal";

export function createSketchboxEditor(): SketchboxEditor {
    return withHistory(createEditor());
}
