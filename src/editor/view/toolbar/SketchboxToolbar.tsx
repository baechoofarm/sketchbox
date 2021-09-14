import React from "react";
import {EditOutlined, ReadOutlined} from "@ant-design/icons";
import style from "./buttons/EditorButton.scss";
import {LinkButton} from "./buttons/LinkButton";
import {UnLinkButton} from "./buttons/UnLinkButton";
import {BulletedButton} from "./buttons/BulletedButton";
import {NumberedButton} from "./buttons/NumberedButton";
import {BoldButton} from "./buttons/BoldButton";
import {ItalicButton} from "./buttons/ItalicButton";
import {UnderlineButton} from "./buttons/UnderlineButton";
import {LineThroughButton} from "./buttons/LineThroghButton";
import {CheckboxButton} from "./buttons/CheckboxButton";
import s from "./sketchboxToolbar.scss";

interface Props {
    isReadMode?: boolean;

    onIsModeChange(isReadMode: boolean): void;
}

const SketchboxToolbar: React.FC<Props> = props => {
    const {isReadMode, onIsModeChange} = props;

    return (
        <div className={s.toolbar}>
            <button onClick={() => onIsModeChange(!isReadMode)} className={style.button}>
                {isReadMode ? <EditOutlined className={style.icon}/> : <ReadOutlined className={style.icon}/>}
            </button>
            <LinkButton/>
            <UnLinkButton/>
            <BulletedButton/>
            <NumberedButton/>
            <BoldButton/>
            <ItalicButton/>
            <UnderlineButton/>
            <LineThroughButton/>
            <CheckboxButton/>
        </div>
    );
};

export {SketchboxToolbar};
