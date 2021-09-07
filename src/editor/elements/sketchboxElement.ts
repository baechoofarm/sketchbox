import {ParagraphElement, LinkElement, MentionElement, ImageElement, ListElement, BulletedElement, NumberedElement} from "../../internal";

export type SketchboxElement =
    ParagraphElement |
    LinkElement |
    MentionElement |
    ImageElement |
    ListElement |
    BulletedElement |
    NumberedElement;
