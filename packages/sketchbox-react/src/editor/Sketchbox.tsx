import React, {useCallback, useMemo, useState} from "react";
import {Editable, ReactEditor, Slate, withReact} from "slate-react";
import {createSketchboxEditor, SketchboxEditor, SketchboxElementType} from "sketchbox";
import {SketchboxElementSwitcher, SketchboxValue, SketchboxFormatSwitcher} from "../internal";
import s from "./sketchbox.scss";

interface Props {
    onKeyDown?: (event: React.KeyboardEvent, editor?: SketchboxEditor & ReactEditor) => void;
}

const Sketchbox: React.FC<Props> = props => {
    const editor = useMemo(() => withReact(createSketchboxEditor()), []);
    const [value, setValue] = useState<SketchboxValue>(() => [{
        type: SketchboxElementType.PARAGRAPH,
        children: [{text: ''}]
    }]);
    const {onKeyDown} = props;

    const onChange = useCallback((newValue: SketchboxValue) => {
        setValue(newValue);
    }, []);

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (onKeyDown) {
            onKeyDown(event, editor);
        }
    }, []);

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
