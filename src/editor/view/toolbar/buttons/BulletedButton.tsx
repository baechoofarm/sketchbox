import React from "react";
import {useSlate} from "slate-react";
import {UnorderedListOutlined} from "@ant-design/icons";
import {toggleList, SketchboxElementType} from "../../../../internal";
import s from "./EditorButton.scss";

export const BulletedButton = () => {
    const editor = useSlate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleList(editor, SketchboxElementType.BULLETED);
    };

    return (
        <button onClick={handleClick} className={s.button}>
            <UnorderedListOutlined className={s.icon}/>
        </button>
    );
};
