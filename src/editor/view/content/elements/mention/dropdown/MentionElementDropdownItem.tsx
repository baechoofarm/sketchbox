import React from "react";
import classNames from "classnames";
import {MentionMember} from "../../../../../../internal";
import s from "./mentionElementDropdownItem.scss";

interface Props {
    member: MentionMember;
    selected: boolean;

    onClick(): void;
}

const MentionElementDropdownItem: React.FC<Props> = props => {
    const {member, selected, onClick} = props;

    return (
        <div
            className={classNames(s.item, {
                [s.selected]: selected
            })}
            title={member.title}
            onClick={onClick}
        >
            {member.title}
        </div>
    );
};

export {MentionElementDropdownItem};
