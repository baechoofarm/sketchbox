import React from "react";
import {Meta} from "@storybook/react";
import {applyBoldFormat, applyItalicFormat, applyLineThroughFormat, applyUnderlineFormat} from "sketchbox";
import {FormatCommand, Sketchbox} from "../../src/internal";

export default {
    title: 'Sketchbox/Editor',
    component: Sketchbox
} as Meta;

const boldCommand = new FormatCommand("b", applyBoldFormat);
const italicCommand = new FormatCommand("i", applyItalicFormat);
const underlineCommand = new FormatCommand("u", applyUnderlineFormat);
const lineThroughCommand = new FormatCommand("l", applyLineThroughFormat);

const commands: FormatCommand[] = [boldCommand, italicCommand, underlineCommand, lineThroughCommand];

const Template = () => {
    return <Sketchbox formatCommands={commands}/>;
};

export const Basic = Template.bind({});
