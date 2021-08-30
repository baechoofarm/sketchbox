import React from "react";
import {SketchboxFormatProps} from "./sketchboxFormatProps";
import {BoldFormatItem} from "./bold/BoldFormatItem";
import {ItalicFormatItem} from "./italic/ItalicFormatItem";

interface Props extends SketchboxFormatProps {

}

export const SketchboxFormatSwitcher: React.FC<Props> = ({leaf, attributes, children, text}) => {
    if (leaf.bold) {
        return (
            <BoldFormatItem leaf={leaf} text={text} attributes={attributes}>
                {children}
            </BoldFormatItem>
        );
    }
    if (leaf.italic) {
        return (
            <ItalicFormatItem leaf={leaf} text={text} attributes={attributes}>
                {children}
            </ItalicFormatItem>
        );
    }
    return <span {...attributes}>{children}</span>;
};
