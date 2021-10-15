import {createEditor} from "slate";
import {withHistory} from "slate-history";
import {withReact} from "slate-react";
import {SketchboxEditor, SketchboxOption, withSketchboxElements} from "../../internal";

export function createSketchboxEditor(option: SketchboxOption): SketchboxEditor {
    return withSketchboxElements(withHistory(withReact(createEditor())), option);
}
