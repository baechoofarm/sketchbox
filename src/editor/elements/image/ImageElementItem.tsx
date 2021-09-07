import React from "react";
import {useFocused, useSelected} from "slate-react";
import {useOverlay} from "react-overlay-layer";
import {ImageElement, SketchboxElementProps} from "../../../internal";
import s from "./imageElementItem.scss";

export interface ImageElementItemProps extends SketchboxElementProps<ImageElement> {

}

const ImageElementItem: React.FC<ImageElementItemProps> = ({attributes, children, element}) => {
    const selected = useSelected();
    const focused = useFocused();

    const overlay = useOverlay(() => (
        <div className={s.toolbar}>
            TOOLBAR
        </div>
    ));

    function onClick() {
        if (overlay.opened) {
            overlay.close();
        } else {
            overlay.open();
        }
    }

    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <img
                    src={element.url}
                    style={{
                        display: 'block',
                        maxWidth: '100%',
                        maxHeight: '20em',
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
