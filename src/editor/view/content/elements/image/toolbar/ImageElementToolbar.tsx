import React, {CSSProperties} from "react";
import {ReactEditor, useSlate} from "slate-react";
import {Transforms} from "slate";
import {Input} from "antd";
import {AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined, CloseOutlined} from "@ant-design/icons";
import classNames from "classnames";
import {ImageElement, ImageElementAlign, TempImageElement} from "../../../../../../internal";
import s from "./imageElementToolbar.scss";

interface Props {
    style: CSSProperties;
    element: ImageElement | TempImageElement;

    onClose(): void;
}

const ImageElementToolbar: React.FC<Props> = props => {
    const {style, element, onClose} = props;
    const {width, height, align} = element;

    const editor = useSlate();

    function setSize(w: number | null, h: number | null) {
        const path = ReactEditor.findPath(editor, element);
        const newProperties: Partial<ImageElement> = {width: w, height: h};

        Transforms.setNodes(editor, newProperties, {at: path});
    }

    function setAlign(newAlign: ImageElementAlign) {
        const path = ReactEditor.findPath(editor, element);
        const newProperties: Partial<ImageElement> = {align: newAlign};

        Transforms.setNodes(editor, newProperties, {at: path});
    }

    return (
        <div className={s.toolbar} style={style}>
            <div className={s.size}>
                <Input
                    className={s.input}
                    value={width ? String(width) : ''}
                    min={"1"}
                    type={"number"}
                    onChange={e => {
                        const v = e.currentTarget.value.trim();
                        const nv = v.length ? parseInt(v, 10) : 0;

                        setSize(nv, height);
                    }}
                />
                <div className={s.px}>px</div>
                <div className={s.x}>X</div>
                <Input
                    className={s.input}
                    value={height ? String(height) : ''}
                    min={"1"}
                    type={"number"}
                    onChange={e => {
                        const v = e.currentTarget.value?.trim();
                        const nv = v.length ? parseInt(v, 10) : 0;

                        setSize(width, nv);
                    }}
                />
                <div className={s.px}>px</div>
            </div>
            <div className={s.divider}/>
            <div className={s.aligns}>
                <button
                    className={classNames({[s.selected]: align === ImageElementAlign.LEFT})}
                    onClick={() => setAlign(ImageElementAlign.LEFT)}
                >
                    <AlignLeftOutlined/>
                </button>
                <button
                    className={classNames({[s.selected]: align === ImageElementAlign.CENTER})}
                    onClick={() => setAlign(ImageElementAlign.CENTER)}
                >
                    <AlignCenterOutlined/>
                </button>
                <button
                    className={classNames({[s.selected]: align === ImageElementAlign.RIGHT})}
                    onClick={() => setAlign(ImageElementAlign.RIGHT)}
                >
                    <AlignRightOutlined/>
                </button>
            </div>
            <div className={s.divider}/>
            <div className={s.menus}>
                <button className={s.close} onClick={onClose}>
                    <CloseOutlined/>
                </button>
            </div>
        </div>
    );
};

export {ImageElementToolbar};
