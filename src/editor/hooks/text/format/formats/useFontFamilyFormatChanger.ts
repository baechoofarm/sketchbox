import {Editor} from "slate";
import {changeFontFamily, useFormatChanger} from "../../../../../internal";

export function useFontFamilyFormatChanger(editor: Editor) {
    return useFormatChanger(editor, "fontFamily", null, changeFontFamily);
}
