import isUrl from "is-url";
import imageExtensions from "image-extensions";
import {Transforms} from "slate";
import {ReactEditor} from "slate-react";
import {
    ImageElement,
    ImageElementAlign,
    ImageInfo,
    SketchboxEditor,
    SketchboxElementType,
    TempImageElement
} from "../../../../internal";

export function isImageUrl(url: string) {
    if (!url) return false;
    if (!isUrl(url)) return false;
    const ext = new URL(url).pathname.split('.').pop() ?? '';
    return imageExtensions.includes(ext);
}

export function getImageDataURI(image: Blob): Promise<string> {
    return new Promise((resolve => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(image);
    }));
}

export function insertImageWithSrc(
    editor: SketchboxEditor,
    type: SketchboxElementType.IMAGE | SketchboxElementType.IMAGE_TEMP,
    src: string
) {
    const text = {text: ''};
    const element: TempImageElement | ImageElement = {
        type,
        src,
        align: ImageElementAlign.LEFT,
        width: null,
        height: null,
        children: [text]
    };
    Transforms.insertNodes(editor, element);

    return element;
}

export async function insertImage(editor: SketchboxEditor, image: Blob,) {
    const src = await getImageDataURI(image);
    return insertImageWithSrc(editor, SketchboxElementType.IMAGE, src);
}

export async function insertTempImage(
    editor: SketchboxEditor,
    image: Blob,
    onImageTempUpload: (image: Blob) => Promise<ImageInfo>
) {
    const src = await getImageDataURI(image);
    const element = insertImageWithSrc(editor, SketchboxElementType.IMAGE_TEMP, src);
    const imageInfo = await onImageTempUpload(image);

    const path = ReactEditor.findPath(editor, element);
    const newProperties: Partial<ImageElement> = {
        type: SketchboxElementType.IMAGE,
        src: imageInfo.src
    };

    Transforms.setNodes(editor, newProperties, {at: path});

    return element;
}
