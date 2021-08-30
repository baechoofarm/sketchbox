import {Range} from "slate";
import {SketchboxEditor} from "sketchbox";

type FormatInputFunction<T> = (value: T, selection: Range | null, editor?: SketchboxEditor) => void;

export class FormatChanger<T> {
    constructor(value: T, formatFunc: FormatInputFunction<T>) {
        this.value = value;
        this.formatFunc = formatFunc;
    }

    private value: T;
    formatFunc: FormatInputFunction<T>;
    private _editor?: SketchboxEditor;
    private _selection: Range | null = null;

    public set editor(editor: SketchboxEditor) {
        this._editor = editor;
    }

    public set selection(selection: Range | null) {
        this._selection = selection;
    }

    change = (newValue: T) => {
        this.value = newValue;
        this.formatFunc(newValue, this._selection, this._editor);
    }
}
