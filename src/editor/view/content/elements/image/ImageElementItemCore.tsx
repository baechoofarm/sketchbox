import React, {CSSProperties, RefObject} from "react";
import classNames from "classnames";
import {useFocused, useSelected} from "slate-react";
import {
    ImageElement,
    ImageElementAlign,
    SketchboxElementProps,
    TempImageElement
} from "../../../../../internal";
import s from "./imageElementItemCore.scss";

export interface ImageElementItemCoreProps extends SketchboxElementProps<ImageElement | TempImageElement> {
    className?: string;
    imageRef?: RefObject<HTMLImageElement>;

    onImageClick?(event: React.MouseEvent<HTMLImageElement>): void;

    onImageLoad?(event: React.SyntheticEvent<HTMLImageElement>): void;
}

const ImageElementItemCore: React.FC<ImageElementItemCoreProps> = props => {
    const {
        attributes, children, element, className,
        imageRef, onImageClick, onImageLoad
    } = props;

    const selected = useSelected();
    const focused = useFocused();

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

    return (
        <div {...attributes} className={className}>
            <div contentEditable={false} style={{textAlign: cssAlign}}>
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt,jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */}
                <img
                    ref={imageRef}
                    className={classNames(s.image, {
                        [s.focused]: selected && focused
                    })}
                    style={{
                        width: width ?? undefined,
                        height: height ?? undefined
                    }}
                    src={element.src}
                    alt={"image"}
                    onClick={onImageClick}
                    onLoad={onImageLoad}
                />
            </div>
            {children}
        </div>
    );
};

export {ImageElementItemCore};
