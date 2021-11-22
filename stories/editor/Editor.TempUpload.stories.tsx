import React, {useCallback, useState} from "react";
import {Meta} from "@storybook/react";
import {EditorMode, getImageDataURI, ImageInfo, MentionMember, Sketchbox, SketchboxElementType, SketchboxValue} from "../../src/main";

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

    const onImageTempUpload = (image: Blob): Promise<ImageInfo> => {
        return new Promise<ImageInfo>((resolve => {
            getImageDataURI(image).then(src => {
                setTimeout(() => resolve({src}), 3000);
            });
        }));
    };

    const onChangeValue = useCallback((newValue: SketchboxValue) => {
        console.log(newValue);
    }, []);

    return (
        <div style={{position: "relative", marginBottom: 30}}>
            <Sketchbox
                option={{
                    mode,
                    value,
                    onChangeValue,
                    onModeChange,
                    onImageTempUpload,
                    mentionable: true,
                    mentionableMembers: members
                }}
            />
        </div>
    );
};

export const TempUpload = Template.bind({});
