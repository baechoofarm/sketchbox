import React from "react";
import {
    SketchboxElementType,
    ImageElementItem,
    LinkElementItem,
    MentionElementItem,
    ParagraphElementItem,
    SketchboxElementProps, BulletedElementItem, ListElementItem, NumberedElementItem, CheckboxElementItem, TempImageElementItem
} from "../../../../internal";

interface Props extends SketchboxElementProps {

}

const SketchboxElementSwitcher: React.FC<Props> = ({
    element,
    attributes,
    children
}) => {
    switch (element.type) {
        case SketchboxElementType.LINK:
            return <LinkElementItem element={element} attributes={attributes}>{children}</LinkElementItem>;
        case SketchboxElementType.MENTION:
            return <MentionElementItem element={element} attributes={attributes}>{children}</MentionElementItem>;
        case SketchboxElementType.IMAGE:
            return <ImageElementItem element={element} attributes={attributes}>{children}</ImageElementItem>;
        case SketchboxElementType.IMAGE_TEMP:
            return <TempImageElementItem element={element} attributes={attributes}>{children}</TempImageElementItem>;
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
