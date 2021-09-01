import React from "react";
import cn from "classnames";
import {SketchboxFormatProps} from "../../internal";
import s from "./sketchboxFormatSwitcher.scss";

interface Props extends SketchboxFormatProps {

}

export const SketchboxFormatSwitcher: React.FC<Props> = ({leaf, attributes, children}) => {
    let fontSize = leaf.fontSize !== undefined ? leaf.fontSize : 16;
    if (fontSize === 0) fontSize = 1;

    return (
        <span
            {...attributes}
            className={cn(s.formatSwitcher, {[s.bold]: leaf.bold}, {[s.italic]: leaf.italic}, {[s.underline]: leaf.underline},
                {[s.lineThrough]: leaf.lineThrough}, leaf.fontFamily ? leaf.fontFamily : null)}
            style={{fontSize}}
        >
            {children}
        </span>
    );
};
