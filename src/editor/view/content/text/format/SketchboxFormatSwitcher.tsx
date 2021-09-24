import React from "react";
import cn from "classnames";
import {RenderLeafProps} from "slate-react";
import {SketchboxText} from "../../../../../internal";
import s from "./sketchboxFormatSwitcher.scss";

export interface SketchboxFormatProps extends RenderLeafProps {
    leaf: SketchboxText;
}

interface Props extends SketchboxFormatProps {

}

export const SketchboxFormatSwitcher: React.FC<Props> = ({leaf, attributes, children}) => {
    let fontSize = leaf.fontSize !== undefined ? leaf.fontSize : 14;
    if (fontSize === 0) fontSize = 1;

    const classname = cn(s.formatSwitcher, {[s.bold]: leaf.bold},
        {[s.italic]: leaf.italic},
        {[s.underline]: leaf.underline},
        {[s.lineThrough]: leaf.lineThrough});

    return (
        <span
            {...attributes}
            className={classname}
            style={{
                fontSize,
                fontFamily: leaf.fontFamily
            }}
        >
            {children}
        </span>
    );
};
