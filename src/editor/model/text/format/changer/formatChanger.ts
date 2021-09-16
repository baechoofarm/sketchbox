import {Range} from "slate";
import {SketchboxEditor} from "../../../../../internal";

export type FormatChangeFunction<T> = (value: T, selection: Range | null, editor?: SketchboxEditor) => void;

export type FormatChanger<T> = {
    value: T | null;
    check: () => void;
    change: (newValue: T) => void;
}
