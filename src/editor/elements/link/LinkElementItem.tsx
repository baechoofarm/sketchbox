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

    const handleMouseDown = () => {
        if (!isReadMode) overlay.open();
    };

    const handleRedirect = () => {
        window.open(element.url);
    };

    const handleClose = () => {
        if (!isReadMode) overlay.close();
    };

    const overlay = useOverlay(() => (
        <div className={s.tooltip}>
            <button className={s.button} onClick={handleRedirect}>
                Open link in a new tab
            </button>
            <button className={s.close} onClick={handleClose}>
                X
            </button>
        </div>
    ));

    return (
        <a {...attributes} href={element.url} onMouseDown={handleMouseDown}>
            {children}
        </a>
    );
};

export {LinkElementItem};
