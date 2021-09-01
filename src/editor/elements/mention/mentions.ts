import {Editor, Transforms} from "slate";
import {MentionElement, SketchboxElementType} from "../../../internal";

export interface MentionMember<T = any> {
    title: string;
    value: T;
}

export function insertMention(editor: Editor, member: MentionMember) {
    const mention: MentionElement = {
        type: SketchboxElementType.MENTION,
        character: member.title,
        value: member.value,
        children: [{text: ''}]
    };
    Transforms.insertNodes(editor, mention);
    Transforms.move(editor);
}
