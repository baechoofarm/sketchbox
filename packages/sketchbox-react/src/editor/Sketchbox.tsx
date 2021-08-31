import React, {useCallback, useMemo, useState} from "react";
import {Editable, Slate, withReact} from "slate-react";
import {createSketchboxEditor, SketchboxElementType} from "sketchbox";
import {SketchboxElementSwitcher, SketchboxValue, SketchboxFormatSwitcher, FormatCommand, FormatChanger} from "../internal";
import s from "./sketchbox.scss";

interface Props {
    formatCommands?: FormatCommand[];
    formatChangers?: FormatChanger[];
}

const Sketchbox: React.FC<Props> = props => {
    const {formatCommands, formatChangers} = props;
    const editor = useMemo(() => withReact(createSketchboxEditor()), []);
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

    return (
        <div className={s.sketchbox}>
            <Slate editor={editor} value={value} onChange={onChange}>
                <Editable
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
                    onKeyDown={handleKeyDown}
                />
            </Slate>
        </div>
    );
};

export {Sketchbox};
