import {Editor} from "slate";
import {useFormatChanger} from "../useFormatChanger";
import {changeFontColor} from "../../../../model/text/format/formats/fontColor";

const DEFAULT_FONT_COLOR = "black";

export function useFontColorFormatChanger(editor: Editor) {
    return useFormatChanger<string>(editor, "fontColor", DEFAULT_FONT_COLOR, changeFontColor);
}
