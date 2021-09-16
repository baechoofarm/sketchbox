import React from "react";
import {ParagraphElement, SketchboxElementProps} from "../../../../../internal";

export interface ParagraphElementItemProps extends SketchboxElementProps<ParagraphElement> {

}

const ParagraphElementItem: React.FC<ParagraphElementItemProps> = ({attributes, children}) => {
    return <p {...attributes}>{children}</p>;
};

export {ParagraphElementItem};
