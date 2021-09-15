import React from "react";
import {
    SketchboxElementType,
    ImageElementItem,
    LinkElementItem,
    MentionElementItem,
    ParagraphElementItem,
    SketchboxElementProps, BulletedElementItem, ListElementItem, NumberedElementItem, CheckboxElementItem
} from "../../../internal";

interface Props extends SketchboxElementProps {
    isReadMode: boolean;
}

const SketchboxElementSwitcher: React.FC<Props> = ({
    element,
    attributes,
    children,
    isReadMode
}) => {
    switch (element.type) {
        case SketchboxElementType.LINK:
            return <LinkElementItem element={element} attributes={attributes} isReadMode={isReadMode}>{children}</LinkElementItem>;
        case SketchboxElementType.MENTION:
            return <MentionElementItem element={element} attributes={attributes}>{children}</MentionElementItem>;
        case SketchboxElementType.IMAGE:
            return <ImageElementItem element={element} attributes={attributes}>{children}</ImageElementItem>;
        case SketchboxElementType.BULLETED:
            return <BulletedElementItem element={element} attributes={attributes}>{children}</BulletedElementItem>;
        case SketchboxElementType.NUMBERED:
            return <NumberedElementItem element={element} attributes={attributes}>{children}</NumberedElementItem>;
        case SketchboxElementType.LIST:
            return <ListElementItem element={element} attributes={attributes}>{children}</ListElementItem>;
        case SketchboxElementType.CHECKBOX:
            return <CheckboxElementItem element={element} attributes={attributes}>{children}</CheckboxElementItem>;
        case SketchboxElementType.PARAGRAPH:
        default:
            return <ParagraphElementItem element={element} attributes={attributes}>{children}</ParagraphElementItem>;
    }
};

export {SketchboxElementSwitcher};