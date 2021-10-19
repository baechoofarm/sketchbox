import React, {useCallback, useState} from "react";
import {Meta} from "@storybook/react";
import {EditorMode, MentionMember, Sketchbox, SketchboxElementType, SketchboxValue} from "../../src/main";

export default {
    title: 'Sketchbox/Editor'
} as Meta;

const members: MentionMember[] = [
    {title: "Byeonggeol Ha", value: "Byeonggeol Ha"},
    {title: "Baechoo", value: "Baechoo"},
];

const Template = () => {
    const [mode, setMode] = useState(EditorMode.WRITE);

    const value: SketchboxValue = [{
        type: SketchboxElementType.PARAGRAPH,
        children: [{text: ''}]
    }];

    const onModeChange = (newMode: EditorMode) => {
        setMode(newMode);
    };

    const onChangeValue = useCallback((newValue: SketchboxValue) => {
        console.log(newValue);
    }, []);

    return (
        <div style={{position: "relative", marginBottom: 30}}>
            <Sketchbox
                value={value}
                onChangeValue={onChangeValue}
                option={{
                    mode,
                    onModeChange,
                    mentionable: true,
                    mentionableMembers: members
                }}
            />
        </div>
    );
};

export const Basic = Template.bind({});
