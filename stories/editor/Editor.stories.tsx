import React from "react";
import {Meta} from "@storybook/react";
import {Sketchbox} from "../../src/internal";
import {EditorWrapper} from "./EditorWrapper";

export default {
    title: 'Sketchbox/Editor',
    component: Sketchbox
} as Meta;

const Template = () => {
    return (
        <>
            <EditorWrapper/>
        </>
    );
};

export const Basic = Template.bind({});
