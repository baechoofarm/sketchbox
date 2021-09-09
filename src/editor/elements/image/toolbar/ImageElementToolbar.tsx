import React from "react";
import {ReactEditor, useSlate} from "slate-react";
import {Transforms} from "slate";
import {ImageElement} from "../../../../internal";
import s from "./imageElementToolbar.scss";

interface Props {
    element: ImageElement;
}

const ImageElementToolbar: React.FC<Props> = ({element}) => {
    const {width, height} = element;
    const editor = useSlate();

    function setSize(w: number | null, h: number | null) {
        const path = ReactEditor.findPath(editor, element);
        const newProperties: Partial<ImageElement> = {width: w, height: h};

        Transforms.setNodes(editor, newProperties, {at: path});
    }

    return (
        <div className={s.toolbar}>
            <input
                value={width ? String(width) : ''}
                type={"number"}
                onChange={e => {
                    const v = e.currentTarget.value.trim();
                    const nv = v.length ? parseInt(v, 10) : 0;

                    setSize(nv, height);
                }}
            />
            &nbsp;
            <input
                value={height ? String(height) : ''}
                type={"number"}
                onChange={e => {
                    const v = e.currentTarget.value?.trim();
                    const nv = v.length ? parseInt(v, 10) : 0;

                    setSize(width, nv);
                }}
            />
        </div>
    );
};

export {ImageElementToolbar};
