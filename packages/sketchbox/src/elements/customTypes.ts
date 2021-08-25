import {BaseEditor} from "slate";
import {ReactEditor} from "slate-react";
import {HistoryEditor} from "slate-history";
import {SketchboxElement, SketchboxText, SketchboxEmptyText} from "../internal";

export type SketchboxDescendant = SketchboxElement | SketchboxText;

declare module 'slate' {
    type CustomElement = SketchboxElement;
    type CustomText = SketchboxText;
    type EmptyText = SketchboxEmptyText;

    type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

    interface CustomTypes {
        Editor: CustomEditor;
        Element: CustomElement;
        Text: CustomText | EmptyText;
    }
}
