import React from "react";
import {SketchboxFormatProps} from "./sketchboxFormatProps";
import {BoldFormatItem} from "./bold/BoldFormatItem";

interface Props extends SketchboxFormatProps {

}

export const SketchboxFormatSwitcher: React.FC<Props> = ({leaf, attributes, children, text}) => {
    if (leaf.bold) {
        return (
            <BoldFormatItem leaf={leaf} attributes={attributes} text={text}>
                {children}
            </BoldFormatItem>
        );
    }
    return <span {...attributes}>{children}</span>;
};
