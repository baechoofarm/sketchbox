import React from "react";
import {BulletedElement, SketchboxElementProps} from "../../../../../internal";

export interface BulletElementItemProps extends SketchboxElementProps<BulletedElement> {

}

const BulletedElementItem: React.FC<BulletElementItemProps> = ({
    attributes,
    children
}) => {
    return (
        <ul {...attributes}>
            {children}
        </ul>
    );
};

export {BulletedElementItem};
