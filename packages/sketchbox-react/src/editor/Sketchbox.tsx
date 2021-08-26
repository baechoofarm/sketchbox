import React, {useCallback, useMemo, useState} from "react";
import {Editable, Slate, withReact} from "slate-react";
import {createSketchboxEditor, SketchboxElementType} from "sketchbox";
import {SketchboxElementSwitcher, SketchboxValue} from "../internal";
import s from "./sketchbox.scss";

const Sketchbox: React.FC = () => {
    const editor = useMemo(() => withReact(createSketchboxEditor()), []);
    const [value, setValue] = useState<SketchboxValue>(() => [{
        type: SketchboxElementType.PARAGRAPH,
        children: [{text: ''}]
    }]);

    const onChange = useCallback((newValue: SketchboxValue) => {
        setValue(newValue);
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
                />
            </Slate>
        </div>
    );
};

export {Sketchbox};
