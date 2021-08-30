import React, {useState} from "react";
import {applyBoldFormat, applyItalicFormat, applyLineThroughFormat, applyUnderlineFormat, changeFontSize} from "sketchbox";
import {FormatCommand} from "../../src/editor/formats/formatCommand";
import {Sketchbox} from "../../src/editor/Sketchbox";
import s from "./EditorWrapper.scss";
import {FormatChanger} from "../../src/editor/formats/formatChanger";

export const EditorWrapper = () => {
    const [fontSize, setFontSize] = useState(16);

    const fontSizeChanger = new FormatChanger<number>(fontSize, changeFontSize);

    const changers = [fontSizeChanger];

    const boldCommand = new FormatCommand("b", applyBoldFormat);
    const italicCommand = new FormatCommand("i", applyItalicFormat);
    const underlineCommand = new FormatCommand("u", applyUnderlineFormat);
    const lineThroughCommand = new FormatCommand("l", applyLineThroughFormat);

    const commands: FormatCommand[] = [boldCommand, italicCommand, underlineCommand, lineThroughCommand];

    const handleChangeFontSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        let size = Number(event.target.value);
        if (Number.isNaN(size)) size = 16;

        fontSizeChanger.change(size);
        setFontSize(size);
    };

    return (
        <div className={s.editor}>
            <div className={s.fontSize}>
                Font Size : <input value={fontSize} onChange={handleChangeFontSize}/>
            </div>
            <Sketchbox formatCommands={commands} formatChangers={changers}/>
        </div>
    );
};
