import React from "react";
import {Meta} from "@storybook/react";
import {EditorWrapper, Sketchbox} from "../../src/internal";
import "./editor.scss";

export default {
    title: 'Sketchbox/Editor',
    component: EditorWrapper
} as Meta;

const Template = () => {
    return <EditorWrapper/>;
};

export const Basic = Template.bind({});
