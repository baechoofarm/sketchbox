import React, {useEffect, useState} from "react";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EditIcon from '@material-ui/icons/Edit';
import {
    applyBoldFormat,
    applyItalicFormat,
    applyLineThroughFormat,
    applyUnderlineFormat,
    changeFontSize,
    changeFontFamily,
    useFormatChanger, Sketchbox, FormatCommand
} from "../internal";
import s from "./EditorWrapper.scss";
import style from "./view/toolbar/buttons/EditorButton.scss";
import {LinkButton} from "./view/toolbar/buttons/LinkButton";
import {UnLinkButton} from "./view/toolbar/buttons/UnLinkButton";
import {BulletedButton} from "./view/toolbar/buttons/BulletedButton";
import {NumberedButton} from "./view/toolbar/buttons/NumberedButton";
import {LineThroughButton} from "./view/toolbar/buttons/LineThroghButton";
import {BoldButton} from "./view/toolbar/buttons/BoldButton";
import {UnderlineButton} from "./view/toolbar/buttons/UnderlineButton";
import {ItalicButton} from "./view/toolbar/buttons/ItalicButton";

export const EditorWrapper = () => {
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
        <div className={s.editor} style={{position: "relative"}}>
            <div className={s.fontSize}>
                <input className={s.input} type={"number"} value={fontSize} onChange={handleChangeFontSize}/>
                <select className={s.input} value={fontFamily ?? ""} onChange={handleChangeFontFamily}>
                    {renderFontOptions()}
                </select>
            </div>
            <Sketchbox formatCommands={commands} formatChangers={changers} isReadMode={isReadMode}>
                <div className={s.toolbar}>
                    <button onClick={() => setMode(!isReadMode)} className={style.button}>
                        {isReadMode ? <EditIcon className={style.icon}/> : <MenuBookIcon className={style.icon}/>}
                    </button>
                    <LinkButton/>
                    <UnLinkButton/>
                    <BulletedButton/>
                    <NumberedButton/>
                    <BoldButton/>
                    <ItalicButton/>
                    <UnderlineButton/>
                    <LineThroughButton/>
                </div>
                <div className={s.marginBottom}/>
            </Sketchbox>
        </div>
    );
};
