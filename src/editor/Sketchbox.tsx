import React, {useCallback, useMemo, useState} from "react";
import {Editable, Slate} from "slate-react";
import cn from "classnames";
import {OverlayRoot} from "react-overlay-layer";
import {
    createSketchboxEditor,
    FormatChanger,
    FormatCommand,
    SketchboxElementSwitcher,
    SketchboxElementType,
    SketchboxFormatSwitcher,
    SketchboxValue,
    SketchboxToolbar, insertLink
} from "../internal";
import s from "./sketchbox.scss";
import {deserialize} from "./utils/deserialize";

interface Props {
    formatCommands?: FormatCommand[];
    formatChangers?: FormatChanger[];
    className?: string;
    isReadMode?: boolean;

    onIsModeChange(isReadMode: boolean): void;
}

const Sketchbox: React.FC<Props> = props => {
    const {
        formatCommands,
        formatChangers,
        className,
        isReadMode,
        onIsModeChange
    } = props;
    const editor = useMemo(() => createSketchboxEditor(), []);
    const [value, setValue] = useState<SketchboxValue>(() => [{
        type: SketchboxElementType.PARAGRAPH,
        children: [{text: ''}]
    }]);

    const onChange = useCallback((newValue: SketchboxValue) => {
        setValue(newValue);

        if (!formatChangers || formatChangers.length < 1 || !editor.selection) return;

        formatChangers.forEach(changer => {
            changer.setEditor(editor);
            changer.check();
        });
    }, [editor, formatChangers]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (formatCommands === undefined || !event.ctrlKey) return;
        formatCommands.forEach(command => {
            if (event.key === command.key) {
                command.formatFunc(editor);
            }
        });
    }, [editor, formatCommands]);

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        const data = e.clipboardData.getData('text/html');
        const parsed = new DOMParser().parseFromString(data, 'text/html');
        const fragment = deserialize(parsed.body) as any[];
        if (fragment.length > 1) {
            fragment.forEach(element => {
                if (element.type) {
                    insertLink(editor, element.url, element.children[0].text);
                } else if (element.text.length > 1) {
                    const texts = element.text.split('\n');
                    if (texts.length) {
                        editor.insertText(element.text.replaceAll('\n', ''));
                    }
                }
            });
            e.preventDefault();
        }
    };

    return (
        <div className={className ? cn(s.sketchbox, className) : s.sketchbox} onPaste={handlePaste}>
            <Slate editor={editor} value={value} onChange={onChange}>
                <SketchboxToolbar
                    isReadMode={isReadMode}
                    onIsModeChange={v => onIsModeChange(v)}
                />
                <div className={s.content}>
                    <Editable
                        className={s.editable}
                        readOnly={isReadMode}
                        renderElement={ep => (
                            <SketchboxElementSwitcher element={ep.element} attributes={ep.attributes} isReadMode={isReadMode ?? false}>
                                {ep.children}
                            </SketchboxElementSwitcher>
                        )}
                        renderLeaf={ep => (
                            <SketchboxFormatSwitcher leaf={ep.leaf} text={ep.text} attributes={ep.attributes}>
                                {ep.children}
                            </SketchboxFormatSwitcher>
                        )}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <OverlayRoot/>
            </Slate>
        </div>
    );
};

export {Sketchbox};
