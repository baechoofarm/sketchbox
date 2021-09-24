import React, {CSSProperties} from "react";
import {CloseOutlined, DisconnectOutlined, ExportOutlined, LinkOutlined} from "@ant-design/icons";
import {SketchboxText} from "../../../../../model/text/sketchboxText";
import {useLink} from "../../../../../model/elements/link/links";
import {LinkElement} from "../../../../../model/elements/link/linkElement";
import s from "./linkElementToolbar.scss";

interface Props {
    style: CSSProperties;
    element: LinkElement;

    onClose(): void;
}

const LinkElementToolbar: React.FC<Props> = props => {
    const {style, element, onClose} = props;

    const [wrapLink, unWrapLink] = useLink();

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

    return (
        <div className={s.toolbar} style={style}>
            <button onClick={handleRedirect}>
                <ExportOutlined className={s.icon}/>
            </button>
            <button onClick={handleEditConnect}>
                <LinkOutlined className={s.icon}/>
            </button>
            <button onClick={handleDisconnect}>
                <DisconnectOutlined className={s.icon}/>
            </button>
            <div className={s.divider}/>
            <button onClick={onClose}>
                <CloseOutlined className={s.icon}/>
            </button>
        </div>
    );
};

export {LinkElementToolbar};
