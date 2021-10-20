import React, {CSSProperties, useState} from "react";
import {useOverlay} from "react-overlay-layer";
import {useSlate} from "slate-react";
import {CloseOutlined, DisconnectOutlined, ExportOutlined, LinkOutlined} from "@ant-design/icons";
import {useLink, LinkElement, LinkInsertDialog} from "../../../../../../internal";
import s from "./linkElementToolbar.scss";

interface Props {
    style: CSSProperties;
    element: LinkElement;

    onClose(): void;
}

const LinkElementToolbar: React.FC<Props> = props => {
    const {style, element, onClose} = props;

    const editor = useSlate();
    const [wrapLink, unWrapLink] = useLink();

    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    const overlay = useOverlay(ov => {
        if (targetRect) {
            const {left, top} = targetRect;
            return (
                <LinkInsertDialog
                    style={{position: "absolute", left, top: top + 24}}
                    element={element}
                    selection={editor.selection}
                />
            );
        }
        return null;
    });

    const handleRedirect = () => {
        window.open(element.url);
    };

    const handleDisconnect = () => {
        unWrapLink();
    };

    const handleEditConnect = (e: React.MouseEvent) => {
        setTargetRect(e.currentTarget.getBoundingClientRect());
        overlay.open();
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
