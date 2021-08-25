import {Editor, Element as SlateElement, Range, Transforms} from "slate";
import {SketchboxElementType, LinkElement} from "../../internal";

function isLinkActive(editor: Editor) {
    const [link] = Editor.nodes(editor, {
        match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === SketchboxElementType.LINK,
    });
    return !!link;
}

export function unwrapLink(editor: Editor) {
    Transforms.unwrapNodes(editor, {
        match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === SketchboxElementType.LINK,
    });
}

export function wrapLink(editor: Editor, url: string) {
    if (isLinkActive(editor)) {
        unwrapLink(editor);
    }

    const {selection} = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    const link: LinkElement = {
        type: SketchboxElementType.LINK,
        url,
        children: isCollapsed ? [{text: url}] : [],
    };

    if (isCollapsed) {
        Transforms.insertNodes(editor, link);
    } else {
        Transforms.wrapNodes(editor, link, {split: true});
        Transforms.collapse(editor, {edge: 'end'});
    }
}
