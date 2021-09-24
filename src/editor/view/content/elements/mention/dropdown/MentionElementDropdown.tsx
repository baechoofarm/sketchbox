import React, {CSSProperties} from "react";
import {MentionElementDropdownItem, MentionMember} from "../../../../../../internal";
import s from "./mentionElementDropdown.scss";

interface Props {
    style: CSSProperties;
    members: MentionMember[];
    selectedIndex: number;

    onSelect(member: MentionMember): void;
}

const MentionElementDropdown: React.FC<Props> = props => {
    const {style, members, selectedIndex, onSelect} = props;

    return (
        <div className={s.dropdown} style={style}>
            {members?.map((member, i) => {
                const key = member.title + i;

                return (
                    <MentionElementDropdownItem
                        key={key}
                        member={member}
                        selected={selectedIndex === i}
                        onClick={() => onSelect(member)}
                    />
                );
            })}
        </div>
    );
};

export {MentionElementDropdown};
