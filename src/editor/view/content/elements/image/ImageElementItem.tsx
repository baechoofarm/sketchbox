import React, {CSSProperties, useEffect, useRef, useState} from "react";
import {ReactEditor, useFocused, useSelected, useSlate} from "slate-react";
import {useOverlay} from "react-overlay-layer";
import classNames from "classnames";
import {Transforms} from "slate";
import {ImageElement, ImageElementAlign, ImageElementToolbar, SketchboxElementProps} from "../../../../../internal";
import s from "./imageElementItem.scss";

export interface ImageElementItemProps extends SketchboxElementProps<ImageElement> {

}

const ImageElementItem: React.FC<ImageElementItemProps> = ({attributes, children, element}) => {
    const selected = useSelected();
    const focused = useFocused();
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

    const {width, height, align} = element;

    const cssAlign: CSSProperties['textAlign'] = (() => {
        switch (align) {
            case ImageElementAlign.CENTER:
                return 'center';
            case ImageElementAlign.RIGHT:
                return 'right';
            case ImageElementAlign.LEFT:
            default:
                return 'left';
        }
    })();

    function onClick(e: React.MouseEvent) {
        setTargetRect(e.currentTarget.getBoundingClientRect());
        if (overlay.opened) {
            overlay.close();
            setTargetRect(null);
        } else {
            overlay.open();
        }
    }

    useEffect(() => {
        if (imageRef.current) {
            const {width: w, height: h} = imageRef.current.getBoundingClientRect();
            const path = ReactEditor.findPath(editor, element);
            const newProperties: Partial<ImageElement> = {width: w, height: h};

            Transforms.setNodes(editor, newProperties, {at: path});
        }
    }, [editor, element]);

    return (
        <div {...attributes}>
            <div contentEditable={false} style={{textAlign: cssAlign}}>
                <img
                    ref={imageRef}
                    className={classNames(s.image, {
                        [s.focused]: selected && focused
                    })}
                    style={{
                        width: width ?? undefined,
                        height: height ?? undefined
                    }}
                    src={element.url}
                    alt={"image"}
                    onClick={onClick}
                />
            </div>
            {children}
        </div>
    );
};

export {ImageElementItem};
