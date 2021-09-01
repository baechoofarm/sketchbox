import {Range} from "slate";
import {SketchboxEditor} from "../../../internal";

export type FormatChangeFunction<T> = (value: T, selection: Range | null, editor?: SketchboxEditor) => void;

export type FormatChanger = {
    check: () => void;
    setEditor: (editor: any) => void;
}
