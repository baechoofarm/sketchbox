import {Editor, Element as SlateElement, Range, Transforms} from "slate";
import {useSlate} from "slate-react";
import {SketchboxElementType, LinkElement, SketchboxEditor} from "../../../../internal";

export function isLinkActive(editor: SketchboxEditor) {
    const [link] = Editor.nodes(editor, {
        match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === SketchboxElementType.LINK,
    });
    return !!link;
}

export function unwrapLink(editor: SketchboxEditor) {
    Transforms.unwrapNodes(editor, {
        match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === SketchboxElementType.LINK,
    });
}

export function wrapLink(editor: SketchboxEditor, url: string, text?: string) {
    if (isLinkActive(editor)) {
        unwrapLink(editor);
    }

    const linkText = text || url;
    const {selection} = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);

    const link: LinkElement = {
        type: SketchboxElementType.LINK,
        url,
        children: isCollapsed ? [{text: linkText}] : [],
    };

    if (isCollapsed) {
        Transforms.insertNodes(editor, link);
    } else {
        Transforms.wrapNodes(editor, link, {split: true});
        Transforms.collapse(editor, {edge: 'end'});
    }
}

export function insertLink(editor: SketchboxEditor, url: string, text?: string) {
    if (editor.selection) {
        wrapLink(editor, url, text);
    }
}

export function useLink(): [(url: string, text?: string) => void, () => void] {
    const editor = useSlate();

    const wrapLinkFunc = (url: string, text?: string) => {
        wrapLink(editor, url, text);
    };

    const unwrapLinkFunc = () => {
        unwrapLink(editor);
    };

    return [wrapLinkFunc, unwrapLinkFunc];
}
