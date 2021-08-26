import React from "react";
import {Meta} from "@storybook/react";
import {Sketchbox} from "../../src/internal";

export default {
    title: 'Sketchbox/Editor',
    component: Sketchbox
} as Meta;

const Template = () => {
    return <Sketchbox/>;
};

export const Basic = Template.bind({});
