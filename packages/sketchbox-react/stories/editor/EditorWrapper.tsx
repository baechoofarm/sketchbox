import React, {useEffect, useState} from "react";
import {applyBoldFormat, applyItalicFormat, applyLineThroughFormat, applyUnderlineFormat, changeFontSize} from "sketchbox";
import {useFormatChanger, Sketchbox, FormatCommand} from "../../src/internal";
import s from "./EditorWrapper.scss";

export const EditorWrapper = () => {
    const defaultSize = 16;
    const [fontSize, setFontSize] = useState(defaultSize);

    const [value, check, change, setEditor] = useFormatChanger("fontSize", defaultSize, changeFontSize);

    const changers = [{check, setEditor}];

    const boldCommand = new FormatCommand("b", applyBoldFormat);
    const italicCommand = new FormatCommand("i", applyItalicFormat);
    const underlineCommand = new FormatCommand("u", applyUnderlineFormat);
    const lineThroughCommand = new FormatCommand("l", applyLineThroughFormat);

    const commands: FormatCommand[] = [boldCommand, italicCommand, underlineCommand, lineThroughCommand];

    const handleChangeFontSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        let size = Number(event.target.value);
        if (Number.isNaN(size)) size = 16;

        change(size);
    };

    useEffect(() => {
        setFontSize(Number(value));
    }, [value]);

    return (
        <div className={s.editor}>
            <div className={s.fontSize}>
                Font Size : <input value={fontSize} onChange={handleChangeFontSize}/>
            </div>
            <Sketchbox formatCommands={commands} formatChangers={changers}/>
        </div>
    );
};
