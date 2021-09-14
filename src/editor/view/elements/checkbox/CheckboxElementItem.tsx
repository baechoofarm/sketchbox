import React from "react";
import {ReactEditor, useSlate} from "slate-react";
import {Transforms} from "slate";
import cn from "classnames";
import {SketchboxElementProps} from "../sketchboxElementProps";
import {CheckboxElement, SketchboxElement} from "../../../../internal";
import s from "./checkboxElementItem.scss";

export interface CheckboxElementItemProps extends SketchboxElementProps<CheckboxElement> {
}

const CheckboxElementItem: React.FC<CheckboxElementItemProps> = ({
    attributes,
    element,
    children
}) => {
    const editor = useSlate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const path = ReactEditor.findPath(editor, element);
        const newProperties: Partial<SketchboxElement> = {
            checked: e.target.checked
        };
        Transforms.setNodes(editor, newProperties, {at: path});
    };

    return (
        <div {...attributes} className={s.checkbox}>
            <input
                className={s.input}
                type="checkbox"
                checked={element.checked}
                onChange={handleChange}
            />
            <span className={cn({[s.checked]: element.checked})}>
                {children}
            </span>
        </div>
    );
};

export {CheckboxElementItem};
