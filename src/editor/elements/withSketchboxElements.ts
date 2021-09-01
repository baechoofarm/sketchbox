import isUrl from "is-url";
import {insertImage, isImageUrl, SketchboxEditor, SketchboxElementType, wrapLink} from "../../internal";

export function withSketchboxElements(editor: SketchboxEditor) {
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
            case SketchboxElementType.IMAGE:
                return true;
        }
        return isVoid(element);
    };

    editor.insertData = data => {
        const text = data.getData('text/plain');
        const {files} = data;

        if (files?.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                const [mime] = file.type.split('/');

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        const url = reader.result as string;
                        insertImage(editor, url);
                    });
                    reader.readAsDataURL(file);
                }
            }
        }
        else if (isImageUrl(text)) {
            insertImage(editor, text);
        }
        else if (text && isUrl(text)) {
            wrapLink(editor, text);
        } else {
            insertData(data);
        }
    };

    return editor;
}
