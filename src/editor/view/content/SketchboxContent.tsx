import React, {useCallback} from "react";
import {Editable, useSlate} from "slate-react";
import {
    useSketchboxOption,
    SketchboxElementSwitcher,
    SketchboxFormatSwitcher,
    deserialize, insertLink,
} from "../../../internal";
import s from "./sketchboxContent.scss";

interface Props {
    onKeyDown(event: React.KeyboardEvent): void;
}

const SketchboxContent: React.FC<Props> = ({onKeyDown}) => {
    const editor = useSlate();
    const {isReadMode} = useSketchboxOption();

    const onPaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
        const data = e.clipboardData.getData('text/html');
        const parsed = new DOMParser().parseFromString(data, 'text/html');
        const fragment = deserialize(parsed.body) as any[];

        if (fragment.length > 1) {
            editor.insertBreak();

            let count = 0;
            fragment.forEach(element => {
                if (element.type) {
                    if (element.type === 'link') {
                        insertLink(editor, element.url, element.children[0].text);
                        count++;
                    }
                } else if (element.text.length >= 1) {
                    const texts = element.text.split('\n');
                    if (texts?.filter((v: string) => v?.length).length) {
                        editor.insertText(element.text.replaceAll('\n', ''));
                        count++;
                    }
                }
            });
            if (count > 0) {
                e.preventDefault();
            }
        }
    }, [editor]);

    return (
        <Editable
            className={s.editable}
            readOnly={isReadMode}
            renderElement={ep => (
                <SketchboxElementSwitcher element={ep.element} attributes={ep.attributes}>
                    {ep.children}
                </SketchboxElementSwitcher>
            )}
            renderLeaf={ep => (
                <SketchboxFormatSwitcher leaf={ep.leaf} text={ep.text} attributes={ep.attributes}>
                    {ep.children}
                </SketchboxFormatSwitcher>
            )}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
        />
    );
};

export {SketchboxContent};
