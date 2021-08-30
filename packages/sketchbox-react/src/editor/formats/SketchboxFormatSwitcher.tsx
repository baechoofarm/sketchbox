import React from "react";
import cn from "classnames";
import {SketchboxFormatProps} from "./sketchboxFormatProps";
import s from "./sketchboxFormatSwitcher.scss";

interface Props extends SketchboxFormatProps {

}

export const SketchboxFormatSwitcher: React.FC<Props> = ({leaf, attributes, children}) => {
    return (
        <span
            {...attributes}
            className={cn(s.formatSwitcher, {[s.bold]: leaf.bold}, {[s.italic]: leaf.italic}, {[s.underline]: leaf.underline},
                {[s.lineThrough]: leaf.lineThrough})}
            style={{fontSize: leaf.fontSize ? leaf.fontSize : 16}}
        >
            {children}
        </span>
    );
};
