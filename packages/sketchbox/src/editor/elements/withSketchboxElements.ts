import {Editor} from "slate";
import isUrl from "is-url";
import {SketchboxElementType, wrapLink} from "../../internal";

export function withSketchboxElements(editor: Editor) {
    const {insertData, insertText, isInline, isVoid} = editor;

    editor.isInline = element => {
        switch (element.type) {
            case SketchboxElementType.LINK:
            case SketchboxElementType.MENTION:
                return true;
        }
        return isInline(element);
    };

    editor.insertText = text => {
        if (text && isUrl(text)) {
            wrapLink(editor, text);
        } else {
            insertText(text);
        }
    };

    editor.isVoid = element => {
        switch (element.type) {
            case SketchboxElementType.MENTION:
                return true;
        }
        return isVoid(element);
    };

    editor.insertData = data => {
        const text = data.getData('text/plain');

        if (text && isUrl(text)) {
            wrapLink(editor, text);
        } else {
            insertData(data);
        }
    };

    return editor;
}
