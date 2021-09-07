import React from "react";
import {useSlate} from "slate-react";
import {toggleList} from "../../src/editor/elements/list/toggleList";
import {SketchboxElementType} from "../../src/editor/elements/sketchboxElementType";

export const BulletButton = () => {
    const editor = useSlate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleList(editor, SketchboxElementType.BULLET);
    };

    return (
        <button onClick={handleClick}>
            Bullet List
        </button>
    );
};
