import React, {useCallback, useMemo, useState} from "react";
import {Slate} from "slate-react";
import cn from "classnames";
import {OverlayRoot} from "react-overlay-layer";
import {
    createSketchboxEditor,
    SketchboxElementType,
    SketchboxValue,
    SketchboxToolbar, insertLink, SketchboxOption,
    deserialize,
    SketchboxContext, SketchboxContent, useFontSizeFormatChanger, useFontFamilyFormatChanger
} from "../internal";
import s from "./sketchbox.scss";

interface Props {
    className?: string;
    option: SketchboxOption;
}

const Sketchbox: React.FC<Props> = ({option, className}) => {
    const editor = useMemo(() => createSketchboxEditor(), []);

    const fontSize = useFontSizeFormatChanger(editor);
    const fontFamily = useFontFamilyFormatChanger(editor);

    const [value, setValue] = useState<SketchboxValue>(() => [{
        type: SketchboxElementType.PARAGRAPH,
        children: [{text: ''}]
    }]);

    const onChange = useCallback((newValue: SketchboxValue) => {
        setValue(newValue);
        [fontSize, fontFamily].forEach(v => v.check());
    }, [fontFamily, fontSize]);

    const handlePaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
        const data = e.clipboardData.getData('text/html');
        const parsed = new DOMParser().parseFromString(data, 'text/html');
        const fragment = deserialize(parsed.body) as any[];

        if (fragment.length > 1) {
            editor.insertBreak();
            fragment.forEach(element => {
                if (element.type) {
                    insertLink(editor, element.url, element.children[0].text);
                } else if (element.text.length >= 1) {
                    const texts = element.text.split('\n');
                    if (texts.length) {
                        editor.insertText(element.text.replaceAll('\n', ''));
                    }
                }
            });
            e.preventDefault();
        }
    }, [editor]);

    return (
        <div className={className ? cn(s.sketchbox, className) : s.sketchbox} onPaste={handlePaste}>
            <Slate editor={editor} value={value} onChange={onChange}>
                <SketchboxContext.Provider
                    value={{
                        ...(option ?? {}),
                        formatChangers: {
                            fontSize, fontFamily
                        }
                    }}
                >
                    <SketchboxToolbar/>
                    <SketchboxContent/>
                    <OverlayRoot/>
                </SketchboxContext.Provider>
            </Slate>
        </div>
    );
};

export {Sketchbox};
