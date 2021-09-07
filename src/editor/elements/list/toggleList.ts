import {Editor, Element, Transforms} from "slate";
import {SketchboxEditor, SketchboxElement, SketchboxElementType} from "../../../internal";

type ListWrapper = SketchboxElementType.BULLET;

const isListActive = (editor: SketchboxEditor, type: SketchboxElementType) => {
    const [match] = Editor.nodes(editor, {
        match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === type,
    });

    return !!match;
};

export const toggleList = (editor: SketchboxEditor, type: ListWrapper) => {
    const isActive = isListActive(editor, type);

    if (isActive) {
        Transforms.unwrapNodes(editor, {
            split: true
        });
    }

    const newProperties: Partial<SketchboxElement> = {
        type: isActive ? SketchboxElementType.PARAGRAPH : SketchboxElementType.LIST
    };
    Transforms.setNodes(editor, newProperties);

    if (!isActive) {
        const listWrapper = {type, children: []};
        Transforms.wrapNodes(editor, listWrapper);
    }
};
