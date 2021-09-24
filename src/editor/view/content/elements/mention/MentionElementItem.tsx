import React from "react";
import {useFocused, useSelected} from "slate-react";
import classNames from "classnames";
import {MentionElement, SketchboxElementProps} from "../../../../../internal";
import s from "./mentionElementItem.scss";

export interface MentionElementItemProps extends SketchboxElementProps<MentionElement> {

}

const MentionElementItem: React.FC<MentionElementItemProps> = ({attributes, children, element}) => {
    const selected = useSelected();
    const focused = useFocused();

    return (
        <span
            {...attributes}
            className={classNames(s.mention, {
                [s.focused]: selected && focused
            })}
            contentEditable={false}
        >
            @{element.character}
            {children}
        </span>
    );
};

export {MentionElementItem};
