import React, {useCallback, useMemo, useState} from "react";
import {Editable, Slate} from "slate-react";
import cn from "classnames";
import {createSketchboxEditor, SketchboxElementType, SketchboxElementSwitcher, SketchboxValue, SketchboxFormatSwitcher, FormatCommand, FormatChanger} from "../internal";
import s from "./sketchbox.scss";

interface Props {
    formatCommands?: FormatCommand[];
    formatChangers?: FormatChanger[];
    className?: string;
    isReadMode?: boolean;
}

const Sketchbox: React.FC<Props> = props => {
    const {
        formatCommands,
        formatChangers,
        className,
        isReadMode
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

    return (
        <div className={className ? cn(s.sketchbox, className) : s.sketchbox}>
            <Slate editor={editor} value={value} onChange={onChange}>
                <Editable
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
                    onKeyDown={handleKeyDown}
                />
            </Slate>
        </div>
    );
};

export {Sketchbox};
