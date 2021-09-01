import React from "react";
import {SketchboxElementType} from "sketchbox";
import {
    ImageElementItem,
    LinkElementItem,
    MentionElementItem,
    ParagraphElementItem,
    SketchboxElementProps
} from "../../internal";

interface Props extends SketchboxElementProps {

}

const SketchboxElementSwitcher: React.FC<Props> = ({element, attributes, children}) => {
    switch (element.type) {
        case SketchboxElementType.LINK:
            return <LinkElementItem element={element} attributes={attributes}>{children}</LinkElementItem>;
        case SketchboxElementType.MENTION:
            return <MentionElementItem element={element} attributes={attributes}>{children}</MentionElementItem>;
        case SketchboxElementType.IMAGE:
            return <ImageElementItem element={element} attributes={attributes}>{children}</ImageElementItem>;
        case SketchboxElementType.PARAGRAPH:
        default:
            return <ParagraphElementItem element={element} attributes={attributes}>{children}</ParagraphElementItem>;
    }
};

export {SketchboxElementSwitcher};
