import React from "react";
import {ReactEditor, useSlate} from "slate-react";
import {Transforms} from "slate";
import {ImageElement, ImageElementAlign} from "../../../../internal";
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

    function setAlign(align: ImageElementAlign) {
        const path = ReactEditor.findPath(editor, element);
        const newProperties: Partial<ImageElement> = {align};

        Transforms.setNodes(editor, newProperties, {at: path});
    }

    return (
        <div className={s.toolbar}>
            <div>
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
            <br/>
            <div>
                <button onClick={() => setAlign(ImageElementAlign.LEFT)}>LEFT</button>
                <button onClick={() => setAlign(ImageElementAlign.CENTER)}>CENTER</button>
                <button onClick={() => setAlign(ImageElementAlign.RIGHT)}>RIGHT</button>
            </div>
        </div>
    );
};

export {ImageElementToolbar};
