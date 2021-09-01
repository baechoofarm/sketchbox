import {createEditor} from "slate";
import {withHistory} from "slate-history";
import {withReact} from "slate-react";
import {SketchboxEditor, withSketchboxElements} from "../internal";

export function createSketchboxEditor(): SketchboxEditor {
    return withSketchboxElements(withHistory(withReact(createEditor())));
}
