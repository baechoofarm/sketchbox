import {useState} from "react";
import {Range} from "slate";
import {getLeafOfSelection, SketchboxEditor, SketchboxEmptyText, SketchboxText} from "sketchbox";

type FormatInputFunction<T> = (value: T, selection: Range | null, editor?: SketchboxEditor) => void;
type IndexType = keyof SketchboxText | keyof SketchboxEmptyText;

export function useFormatChanger<T extends IndexType, U>(
    format: T, defaultValue: any, formatFunc: FormatInputFunction<U>
) {
    const [value, setValue] = useState(defaultValue);
    const [editor, setEditor] = useState<SketchboxEditor | null>(null);
    const [selection, setSelection] = useState<Range | null>(null);

    const check = () => {
        if (editor === null || editor.selection === null) return;
        setSelection(editor.selection);
        const leaf = getLeafOfSelection(editor);
        if (leaf && leaf[0][format] !== undefined) {
            const selectedValue = leaf[0][format];
            setValue(selectedValue);
        } else {
            if (!leaf) return;
            setValue(defaultValue);
        }
    };

    const change = (newValue: any) => {
        if (editor === null || selection === null) return;
        setValue(newValue);
        formatFunc(newValue, selection, editor);
    };

    return [value, check, change, setEditor];
}
