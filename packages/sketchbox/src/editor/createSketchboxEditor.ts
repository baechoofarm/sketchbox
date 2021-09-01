import {createEditor} from "slate";
import {withHistory} from "slate-history";
import {SketchboxEditor, withSketchboxElements} from "../internal";

export function createSketchboxEditor(): SketchboxEditor {
    return withSketchboxElements(withHistory(createEditor()));
}
