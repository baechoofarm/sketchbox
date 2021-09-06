import React from "react";
import {ListElement, SketchboxElementProps} from "../../../internal";

export interface ListElementItemProps extends SketchboxElementProps<ListElement> {

}

const ListElementItem: React.FC<ListElementItemProps> = ({
    attributes,
    children
}) => {
    return (
        <li {...attributes}>
            {children}
        </li>
    );
};

export {ListElementItem};
