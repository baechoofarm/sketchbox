import {
    ParagraphElement,
    LinkElement,
    MentionElement,
    ImageElement,
    ListElement,
    BulletedElement,
    NumberedElement,
    CheckboxElement
} from "../../../internal";

export type SketchboxElement =
    ParagraphElement |
    LinkElement |
    MentionElement |
    ImageElement |
    ListElement |
    BulletedElement |
    NumberedElement |
    CheckboxElement;
