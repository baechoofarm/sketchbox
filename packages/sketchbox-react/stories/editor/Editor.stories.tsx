import React from "react";
import {Meta} from "@storybook/react";
import {applyBoldFormat, applyItalicFormat} from "sketchbox";
import {FormatCommand, Sketchbox} from "../../src/internal";

export default {
    title: 'Sketchbox/Editor',
    component: Sketchbox
} as Meta;

const boldCommand = new FormatCommand("b", applyBoldFormat);
const italicCommand = new FormatCommand("i", applyItalicFormat);
const commands: FormatCommand[] = [boldCommand, italicCommand];

const Template = () => {
    return <Sketchbox formatCommands={commands}/>;
};

export const Basic = Template.bind({});
