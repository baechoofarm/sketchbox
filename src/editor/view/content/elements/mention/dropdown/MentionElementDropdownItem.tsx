import React from "react";
import classNames from "classnames";
import {MentionMember} from "../../../../../../internal";
import s from "./mentionElementDropdownItem.scss";

interface Props {
    member: MentionMember;
    selected: boolean;
}

const MentionElementDropdownItem: React.FC<Props> = props => {
    const {member, selected} = props;

    return (
        <div
            className={classNames(s.item, {
                [s.selected]: selected
            })}
            title={member.title}
        >
            {member.title}
        </div>
    );
};

export {MentionElementDropdownItem};
