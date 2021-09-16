import React from "react";
import {SketchboxElementProps} from "../../../../../internal";
import {NumberedElement} from "../../../../model/elements/listed/numberedElement";

export interface NumberedElementItemProps extends SketchboxElementProps<NumberedElement> {

}

const NumberedElementItem: React.FC<NumberedElementItemProps> = ({
    attributes,
    children
}) => {
    return (
        <ol {...attributes}>
            {children}
        </ol>
    );
};

export {NumberedElementItem};
