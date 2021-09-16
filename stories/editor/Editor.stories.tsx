import React, {useState} from "react";
import {Meta} from "@storybook/react";
import {EditorMode, Sketchbox} from "../../src/main";
import s from "./editor.scss";

export default {
    title: 'Sketchbox/Editor'
} as Meta;

const Template = () => {
    const [mode, setMode] = useState(EditorMode.WRITE);

    const onModeChange = (newMode: EditorMode) => {
        setMode(newMode);
    };

    return (
        <div className={s.editor} style={{position: "relative", marginBottom: 30}}>
            <Sketchbox
                option={{
                    mode,
                    onModeChange
                }}
            />
        </div>
    );
};

export const Basic = Template.bind({});
