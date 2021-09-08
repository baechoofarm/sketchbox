import React from "react";
import {useOverlay} from "react-overlay-layer";
import {LinkElement, SketchboxElementProps} from "../../../internal";
import s from "./linkElementItem.scss";

export interface LinkElementItemProps extends SketchboxElementProps<LinkElement> {
    isReadMode: boolean;
}

const LinkElementItem: React.FC<LinkElementItemProps> = ({
    attributes,
    element,
    children,
    isReadMode
}) => {

    const handleMouseOver = () => {
        if (!isReadMode) overlay.open();
    };

    const handleClick = () => {
        if (!isReadMode) overlay.close();
    };

    const overlay = useOverlay(() => (
        <div className={s.tooltip}>
            Overlay
            <button className={s.close} onClick={handleClick}>
                Close
            </button>
        </div>
    ));

    return (
        <a {...attributes} href={element.url} onMouseOver={handleMouseOver}>
            {children}
        </a>
    );
};

export {LinkElementItem};
