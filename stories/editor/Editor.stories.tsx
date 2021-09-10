import React, {useEffect, useState} from "react";
import {Meta} from "@storybook/react";
import {
    applyBoldFormat, applyItalicFormat, applyLineThroughFormat, applyUnderlineFormat,
    changeFontFamily,
    changeFontSize,
    FormatCommand,
    Sketchbox,
    useFormatChanger
} from "../../src/internal";
import s from "./editor.scss";

export default {
    title: 'Sketchbox/Editor'
} as Meta;

const Template = () => {
    const defaultSize = 16;
    const defaultFamily = null;
    const [fontSize, setFontSize] = useState(defaultSize);
    const [fontFamily, setFontFamily] = useState<string | null>(defaultFamily);

    const [_fontSize, fontSizeCheck, changeSize, setFontSizeEditor] = useFormatChanger("fontSize", defaultSize, changeFontSize);
    const [_fontFamily, fontFamilyCheck, changeFamily, setFontFamilyEditor] = useFormatChanger("fontFamily", defaultFamily,
        changeFontFamily);

    const changers = [{
        check: fontSizeCheck,
        setEditor: setFontSizeEditor
    }, {
        check: fontFamilyCheck,
        setEditor: setFontFamilyEditor
    }];

    const boldCommand = new FormatCommand("b", applyBoldFormat);
    const italicCommand = new FormatCommand("i", applyItalicFormat);
    const underlineCommand = new FormatCommand("u", applyUnderlineFormat);
    const lineThroughCommand = new FormatCommand("l", applyLineThroughFormat);

    const commands: FormatCommand[] = [boldCommand, italicCommand, underlineCommand, lineThroughCommand];

    const fonts = {
        NONE: null,
        NOTO_SANS_KR: s.noto_sans_kr,
        BLACK_HAN_SANS: s.black_han_sans,
        YEON_SUNG: s.yeon_sung
    };

    type FontType = "NOTO_SANS_KR" | "BLACK_HAN_SANS" | "YEON_SUNG";
    const renderFontOptions = () => {
        return Object.keys(fonts)
            .map(font => {
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
        setFontFamily(_fontFamily ? _fontFamily as string : null);
    };

    useEffect(() => {
        setFontSize(Number(_fontSize));
    }, [_fontSize]);

    useEffect(() => {
        setFontFamily(_fontFamily ? _fontFamily as string : null);
    }, [_fontFamily]);

    const [isReadMode, setMode] = useState(false);

    return (
        <div className={s.editor} style={{position: "relative", marginBottom: 30}}>
            <div className={s.fontSize}>
                <input className={s.input} type={"number"} value={fontSize} onChange={handleChangeFontSize}/>
                <select className={s.input} value={fontFamily ?? ""} onChange={handleChangeFontFamily}>
                    {renderFontOptions()}
                </select>
            </div>
            <Sketchbox
                formatCommands={commands}
                formatChangers={changers}
                isReadMode={isReadMode}
                onIsModeChange={v => setMode(v)}
            />
        </div>
    );
};

export const Basic = Template.bind({});
