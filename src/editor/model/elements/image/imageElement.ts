import {SketchboxElementBase, SketchboxElementType, SketchboxEmptyText} from "../../../../internal";

export enum ImageElementAlign {
    LEFT = 'LEFT',
    CENTER = 'CENTER',
    RIGHT = 'RIGHT'
}

export interface ImageElement extends SketchboxElementBase {
    readonly type: SketchboxElementType.IMAGE;
    src: string;
    width: number | null;
    height: number | null;
    align: ImageElementAlign;
    children: SketchboxEmptyText[];
}

export interface TempImageElement extends Omit<ImageElement, 'type'> {
    readonly type: SketchboxElementType.IMAGE_TEMP;
}
