import React from "react";
import {Meta} from "@storybook/react";
import {applyBoldFormat, SketchboxEditor} from "sketchbox";
import {ReactEditor} from "slate-react";
import {Sketchbox} from "../../src/internal";

export default {
    title: 'Sketchbox/Editor',
    component: Sketchbox
} as Meta;

const onKeyDown = (event: React.KeyboardEvent, editor?: SketchboxEditor & ReactEditor) => {
    if (!event.ctrlKey) return;
    if (editor !== undefined && event.ctrlKey && event.key === 'b') {
        alert('bold!');
        event.preventDefault();
        applyBoldFormat(editor);
    }
};

const Template = () => {
    return <Sketchbox onKeyDown={onKeyDown}/>;
};

export const Basic = Template.bind({});
