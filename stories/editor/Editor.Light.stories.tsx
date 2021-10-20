import React, {useCallback} from "react";
import {Meta} from "@storybook/react";
import {MentionMember} from "../../src/editor/model/elements/mention/mentions";
import {SketchboxValue} from "../../src/editor/model/sketchboxValue";
import {SketchboxElementType} from "../../src/editor/model/elements/sketchboxElementType";
import {LightBox} from "../../src/editor/lightBox/LightBox";

export default {
    title: 'Sketchbox/Editor'
} as Meta;

const members: MentionMember[] = [
    {title: "Byeonggeol Ha", value: "Byeonggeol Ha"},
    {title: "Baechoo", value: "Baechoo"},
];

const Template = () => {
    const value: SketchboxValue = [{
        type: SketchboxElementType.PARAGRAPH,
        children: [{text: ''}]
    }];

    const onChangeValue = useCallback((newValue: SketchboxValue) => {
        console.log(newValue);
    }, []);

    return (
        <div style={{position: "relative", marginBottom: 30}}>
            <LightBox
                option={{
                    mentionable: true,
                    mentionableMembers: members,
                    modeChangeable: false
                }}
                value={value}
                onChangeValue={onChangeValue}
            />
        </div>
    );
};

export const Light = Template.bind({});
