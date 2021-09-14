import React from "react";
import {ReactEditor, useSlate} from "slate-react";
import {Transforms} from "slate";
import {SketchboxElementProps} from "../sketchboxElementProps";
import {CheckboxElement, SketchboxElement} from "../../../../internal";

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
        <span {...attributes}>
            <input type="checkbox" checked={element.checked} onChange={handleChange}/>
            <span>
                {children}
            </span>
        </span>
    );
};

export {CheckboxElementItem};
