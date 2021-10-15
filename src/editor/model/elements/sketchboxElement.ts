import {
    ParagraphElement,
    LinkElement,
    MentionElement,
    ImageElement,
    ListElement,
    BulletedElement,
    NumberedElement,
    CheckboxElement, TempImageElement
} from "../../../internal";

export type SketchboxElement =
    ParagraphElement |
    LinkElement |
    MentionElement |
    ImageElement |
    TempImageElement |
    ListElement |
    BulletedElement |
    NumberedElement |
    CheckboxElement;
