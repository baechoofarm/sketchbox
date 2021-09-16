import {useState} from "react";
import {Selection} from "slate";
import {
    getLeafOfSelection,
    SketchboxEditor,
    FormatChangeFunction,
    SketchboxFormatIndex,
    FormatChanger
} from "../../../../internal";

export function useFormatChanger<T, U extends SketchboxFormatIndex = SketchboxFormatIndex>(
    editor: SketchboxEditor,
    format: U,
    defaultValue: T | null,
    formatFunc: FormatChangeFunction<T>
): FormatChanger<T> {
    const [value, setValue] = useState<T | null>(defaultValue);
    const [selection, setSelection] = useState<Selection | null>(null);

    const check = () => {
        if (editor.selection) {
            const leaf = getLeafOfSelection(editor);
            const selectedValue = leaf?.[0]?.[format];

            if (selectedValue) {
                setValue(selectedValue as unknown as T);
            } else if (leaf) {
                setValue(defaultValue);
            }
            setSelection(editor.selection);
        }
    };

    const change = (newValue: T) => {
        if (selection) {
            setValue(newValue);
            formatFunc(newValue, selection, editor);
        }
    };

    return {value, check, change};
}
