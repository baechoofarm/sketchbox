import React from "react";
import s from "./sketchboxToolbarRow.scss";

const SketchboxToolbarRow: React.FC = ({children}) => {
    return (
        <div className={s.row}>
            {children}
        </div>
    );
};

export {SketchboxToolbarRow};
