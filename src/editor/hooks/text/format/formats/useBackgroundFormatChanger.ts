import {Editor} from "slate";
import {useFormatChanger} from "../useFormatChanger";
import {changeBackgroundColor} from "../../../../model/text/format/formats/backgroundColor";

const DEFAULT_BACKGROUND_COLOR = "white";

export function useBackgroundFormatChanger(editor: Editor) {
    return useFormatChanger<string>(editor, "backgroundColor", DEFAULT_BACKGROUND_COLOR, changeBackgroundColor);
}
