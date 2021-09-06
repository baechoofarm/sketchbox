import React from "react";
import {BulletElement, SketchboxElementProps} from "../../../internal";

export interface BulletElementItemProps extends SketchboxElementProps<BulletElement> {

}

const BulletElementItem: React.FC<BulletElementItemProps> = ({
    attributes,
    children
}) => {
    return (
        <ul {...attributes}>
            {children}
        </ul>
    );
};

export {BulletElementItem};
