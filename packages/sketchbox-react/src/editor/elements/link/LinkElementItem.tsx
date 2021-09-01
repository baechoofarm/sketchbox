import React from "react";
import {LinkElement} from "sketchbox";
import {SketchboxElementProps} from "../../../internal";

export interface LinkElementItemProps extends SketchboxElementProps<LinkElement> {

}

const LinkElementItem: React.FC<LinkElementItemProps> = ({
    attributes,
    element,
    children
}) => {
    return (
        <a {...attributes} href={element.url}>
            {children}
        </a>
    );
};

export {LinkElementItem};
