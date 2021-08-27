import React, {useCallback, useMemo, useState} from "react";
import {Editable, Slate, withReact} from "slate-react";
import {createSketchboxEditor, SketchboxElementType} from "sketchbox";
import {SketchboxElementSwitcher, SketchboxValue, SketchboxFormatSwitcher, FormatCommand} from "../internal";
import s from "./sketchbox.scss";

interface Props {
    formatCommand?: FormatCommand;
}

const Sketchbox: React.FC<Props> = props => {
    const editor = useMemo(() => withReact(createSketchboxEditor()), []);
    const [value, setValue] = useState<SketchboxValue>(() => [{
        type: SketchboxElementType.PARAGRAPH,
        children: [{text: ''}]
    }]);
    const {formatCommand} = props;

    const onChange = useCallback((newValue: SketchboxValue) => {
        setValue(newValue);
    }, []);

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (formatCommand && event.ctrlKey && event.key === formatCommand.command) {
            formatCommand.formatFunc(editor);
        }
    }, [editor, formatCommand]);

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
