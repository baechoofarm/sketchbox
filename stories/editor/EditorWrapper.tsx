import React, {useEffect, useState} from "react";
import {
    applyBoldFormat,
    applyItalicFormat,
    applyLineThroughFormat,
    applyUnderlineFormat,
    changeFontSize,
    changeFontFamily,
    useFormatChanger, Sketchbox, FormatCommand
} from "../../src/internal";
import s from "./EditorWrapper.scss";

export const EditorWrapper = () => {
    const defaultSize = 16;
    const defaultFamily = s.noto_sans_kr;
    const [fontSize, setFontSize] = useState(defaultSize);
    const [fontFamily, setFontFamily] = useState(defaultFamily);

    const [_fontSize, fontSizeCheck, changeSize, setFontSizeEditor] = useFormatChanger("fontSize", defaultSize, changeFontSize);
    const [_fontFamily, fontFamilyCheck, changeFamily, setFontFamilyEditor] = useFormatChanger("fontFamily", defaultFamily,
        changeFontFamily);

    const changers = [{check: fontSizeCheck, setEditor: setFontSizeEditor}, {check: fontFamilyCheck, setEditor: setFontFamilyEditor}];

    const boldCommand = new FormatCommand("b", applyBoldFormat);
    const italicCommand = new FormatCommand("i", applyItalicFormat);
    const underlineCommand = new FormatCommand("u", applyUnderlineFormat);
    const lineThroughCommand = new FormatCommand("l", applyLineThroughFormat);

    const commands: FormatCommand[] = [boldCommand, italicCommand, underlineCommand, lineThroughCommand];

    const fonts = {
        NOTO_SANS_KR: s.noto_sans_kr,
        BLACK_HAN_SANS: s.black_han_sans,
        YEON_SUNG: s.yeon_sung
    };

    type FontType = "NOTO_SANS_KR" | "BLACK_HAN_SANS" | "YEON_SUNG";
    const renderFontOptions = () => {
        return Object.keys(fonts).map(font => {
            return <option key={font} value={fonts[font as FontType]}>{font}</option>;
        });
    };

    const handleChangeFontSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        let size = Number(event.target.value);
        if (Number.isNaN(size)) size = 16;

        changeSize(size);
    };

    const handleChangeFontFamily = (event: React.ChangeEvent<HTMLSelectElement>) => {
        changeFamily(event.target.value);
        setFontFamily(_fontFamily as string);
    };

    useEffect(() => {
        setFontSize(Number(_fontSize));
    }, [_fontSize]);

    useEffect(() => {
        setFontFamily(_fontFamily as string);
    }, [_fontFamily]);

    return (
        <div className={s.editor}>
            <div className={s.fontSize}>
                <span>Font Size : </span>
                <input type={"number"} value={fontSize} onChange={handleChangeFontSize}/>
                <span>Font Family : </span>
                <select value={fontFamily} onChange={handleChangeFontFamily}>
                    {renderFontOptions()}
                </select>
            </div>
            <Sketchbox formatCommands={commands} formatChangers={changers}/>
        </div>
    );
};
