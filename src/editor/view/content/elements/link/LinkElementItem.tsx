import React from "react";
import {useOverlay} from "react-overlay-layer";
import {CloseCircleOutlined, DisconnectOutlined, ExportOutlined, LinkOutlined} from "@ant-design/icons";
import {
    LinkElement,
    SketchboxElementProps,
    SketchboxText,
    useLink,
    useSketchboxOption
} from "../../../../../internal";
import s from "./linkElementItem.scss";

export interface LinkElementItemProps extends SketchboxElementProps<LinkElement> {

}

const LinkElementItem: React.FC<LinkElementItemProps> = ({
    attributes,
    element,
    children
}) => {
    const {isReadMode} = useSketchboxOption();
    const [wrapLink, unWrapLink] = useLink();

    const overlay = useOverlay(() => (
        <div className={s.tooltip}>
            <button className={s.button} onClick={handleRedirect}>
                <ExportOutlined className={s.icon}/>
            </button>
            <button className={s.button} onClick={handleEditConnect}>
                <LinkOutlined className={s.icon}/>
            </button>
            <button className={s.button} onClick={handleDisconnect}>
                <DisconnectOutlined className={s.icon}/>
            </button>
            <button className={s.button} onClick={handleClose}>
                <CloseCircleOutlined className={s.icon}/>
            </button>
        </div>
    ));

    const handleMouseDown = () => {
        if (!isReadMode) overlay.open();
    };

    const handleRedirect = () => {
        window.open(element.url);
    };

    const handleDisconnect = () => {
        unWrapLink();
    };

    const handleEditConnect = () => {
        const url = window.prompt('Enter the URL of the link: ', element.url);
        const child = element.children[0] as SketchboxText;
        const text = window.prompt('Enter the Text of the link: ', child.text);
        if (!url) return;
        wrapLink(url, text ?? url);
    };

    const handleClose = () => {
        if (!isReadMode) overlay.close();
    };

    return (
        <a {...attributes} href={element.url} onMouseDown={handleMouseDown}>
            {children}
        </a>
    );
};

export {LinkElementItem};
