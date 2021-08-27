import React from "react";
import {Meta} from "@storybook/react";
import {applyBoldFormat} from "sketchbox";
import {FormatCommand, Sketchbox} from "../../src/internal";

export default {
    title: 'Sketchbox/Editor',
    component: Sketchbox
} as Meta;

const boldCommand = new FormatCommand("b", applyBoldFormat);

const Template = () => {
    return <Sketchbox formatCommand={boldCommand}/>;
};

export const Basic = Template.bind({});
