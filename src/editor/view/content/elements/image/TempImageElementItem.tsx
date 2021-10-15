import React from "react";
import {ImageElementItemCore, SketchboxElementProps, TempImageElement} from "../../../../../internal";
import s from "./tempImageElementItem.scss";

export interface TempImageElementItemProps extends SketchboxElementProps<TempImageElement> {

}

const TempImageElementItem: React.FC<TempImageElementItemProps> = ({attributes, children, element}) => {
    return (
        <ImageElementItemCore className={s.temp} element={element} attributes={attributes}>
            {children}
        </ImageElementItemCore>
    );
};

export {TempImageElementItem};
