import React, {useRef, useState} from "react";
import {useOverlay} from "react-overlay-layer";
import {ReactEditor, useSlate} from "slate-react";
import {Transforms} from "slate";
import {ImageElement, ImageElementItemCore, ImageElementToolbar, SketchboxElementProps} from "../../../../../internal";

export interface ImageElementItemProps extends SketchboxElementProps<ImageElement> {

}

const ImageElementItem: React.FC<ImageElementItemProps> = ({attributes, children, element}) => {
    const editor = useSlate();

    const imageRef = useRef<HTMLImageElement>(null);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    const overlay = useOverlay(ov => {
        if (targetRect) {
            return (
                <ImageElementToolbar
                    element={element}
                    style={{
                        left: targetRect.left,
                        top: targetRect.bottom + 5,
                        position: "absolute"
                    }}
                    onClose={() => ov.close()}
                />
            );
        }
        return null;
    });

    const onImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        const {clientWidth: w, clientHeight: h} = event.currentTarget;
        const newProperties: Partial<ImageElement> = {width: Math.round(w), height: Math.round(h)};
        const path = ReactEditor.findPath(editor, element);

        Transforms.setNodes(editor, newProperties, {at: path});
    };

    const onImageClick = (e: React.MouseEvent) => {
        setTargetRect(e.currentTarget.getBoundingClientRect());
        if (overlay.opened) {
            overlay.close();
            setTargetRect(null);
        } else {
            overlay.open();
        }
    };

    return (
        <ImageElementItemCore
            imageRef={imageRef}
            element={element}
            attributes={attributes}
            onImageClick={onImageClick}
            onImageLoad={onImageLoad}
        >
            {children}
        </ImageElementItemCore>
    );
};

export {ImageElementItem};
