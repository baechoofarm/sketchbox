import isUrl from "is-url";
import imageExtensions from "image-extensions";
import {Transforms} from "slate";
import {ImageElement, SketchboxEditor, SketchboxElementType} from "../../../internal";

export function isImageUrl(url: string) {
    if (!url) return false;
    if (!isUrl(url)) return false;
    const ext = new URL(url).pathname.split('.').pop() ?? '';
    return imageExtensions.includes(ext);
}

export function insertImage(editor: SketchboxEditor, url: string) {
    const text = {text: ''};
    const image: ImageElement = {type: SketchboxElementType.IMAGE, url, children: [text]};
    Transforms.insertNodes(editor, image);
}
