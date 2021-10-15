import React, {useState} from "react";
import {Meta} from "@storybook/react";
import {EditorMode, getImageDataURI, ImageInfo, MentionMember, Sketchbox} from "../../src/main";

export default {
    title: 'Sketchbox/Editor'
} as Meta;

const members: MentionMember[] = [
    {title: "Byeonggeol Ha", value: "Byeonggeol Ha"},
    {title: "Baechoo", value: "Baechoo"},
];

const Template = () => {
    const [mode, setMode] = useState(EditorMode.WRITE);

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

    return (
        <div style={{position: "relative", marginBottom: 30}}>
            <Sketchbox
                option={{
                    mode,
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
