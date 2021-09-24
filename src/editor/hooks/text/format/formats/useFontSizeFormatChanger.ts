import {Editor} from "slate";
import {changeFontSize, useFormatChanger} from "../../../../../internal";

const DEFAULT_FONT_SIZE = 14;

export function useFontSizeFormatChanger(editor: Editor) {
    return useFormatChanger<number>(editor, "fontSize", DEFAULT_FONT_SIZE, changeFontSize);
}
