import React from "react";
import {useSlate} from "slate-react";
import {OrderedListOutlined} from "@ant-design/icons";
import {toggleList, SketchboxElementType} from "../../../../internal";
import s from "./EditorButton.scss";

export const NumberedButton = () => {
    const editor = useSlate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleList(editor, SketchboxElementType.NUMBERED);
    };

    return (
        <button onClick={handleClick} className={s.button}>
            <OrderedListOutlined className={s.icon}/>
        </button>
    );
};
