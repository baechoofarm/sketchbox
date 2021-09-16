import React, {CSSProperties} from "react";
import {useFocused, useSelected} from "slate-react";
import {useOverlay} from "react-overlay-layer";
import {ImageElement, ImageElementAlign, ImageElementToolbar, SketchboxElementProps} from "../../../../../internal";
import s from "./imageElementItem.scss";

export interface ImageElementItemProps extends SketchboxElementProps<ImageElement> {

}

const ImageElementItem: React.FC<ImageElementItemProps> = ({attributes, children, element}) => {
    const selected = useSelected();
    const focused = useFocused();

    const overlay = useOverlay(() => <ImageElementToolbar element={element}/>);
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
        const {clientWidth, clientHeight} = e.currentTarget;
        if (overlay.opened) {
            overlay.close();
        } else {
            overlay.open();
        }
    }

    return (
        <div {...attributes}>
            <div contentEditable={false} style={{textAlign: cssAlign}}>
                <img
                    src={element.url}
                    style={{
                        display: 'inline-block',
                        maxWidth: '100%',
                        width: width ?? undefined,
                        height: height ?? undefined,
                        boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}`
                    }}
                    alt={"image"}
                    onClick={onClick}
                />
            </div>
            {children}
        </div>
    );
};

export {ImageElementItem};
