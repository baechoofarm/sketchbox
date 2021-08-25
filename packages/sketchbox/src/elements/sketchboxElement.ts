import {ParagraphElement} from "./paragraph/paragraphElement";
import {TextElement} from "./text/textElement";
import {LinkElement} from "./link/linkElement";
import {MentionElement} from "./mention/mentionElement";

export type SketchboxElement =
    ParagraphElement |
    TextElement |
    LinkElement |
    MentionElement;
