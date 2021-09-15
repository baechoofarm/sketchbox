import React from "react";
import s from "./sketchboxToolbarButton.scss";

interface Props {
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;
}

const SketchboxToolbarButton: React.FC<Props> = ({onClick, children}) => {
    return (
        <button className={s.btn} onClick={onClick}>
            {children}
        </button>
    );
};

export {SketchboxToolbarButton};
