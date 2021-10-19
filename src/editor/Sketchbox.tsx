import React, {useMemo} from "react";
import cn from "classnames";
import {
    createSketchboxEditor,
    SketchboxOption,
    SketchboxContext,
    useFontSizeFormatChanger,
    useFontFamilyFormatChanger,
    SketchboxView, SketchboxValue
} from "../internal";
import s from "./sketchbox.scss";
import {useFontColorFormatChanger} from "./hooks/text/format/formats/useFontColorFormatChanger";
import {useBackgroundFormatChanger} from "./hooks/text/format/formats/useBackgroundFormatChanger";

interface Props {
    className?: string;
    option: SketchboxOption;
    value: SketchboxValue;
    onChangeValue: (value: SketchboxValue) => void;
}

const Sketchbox: React.FC<Props> = ({option, className, value, onChangeValue}) => {
    const editor = useMemo(() => createSketchboxEditor(option), [option]);

    const fontSize = useFontSizeFormatChanger(editor);
    const fontFamily = useFontFamilyFormatChanger(editor);
    const fontColor = useFontColorFormatChanger(editor);
    const backgroundColor = useBackgroundFormatChanger(editor);

    return (
        <div className={className ? cn(s.sketchbox, className) : s.sketchbox}>
            <SketchboxContext.Provider
                value={{
                    ...(option ?? {}),
                    formatChangers: {fontSize, fontFamily, fontColor, backgroundColor}
                }}
            >
                <SketchboxView editor={editor} value={value} onChangeValue={onChangeValue}/>
            </SketchboxContext.Provider>
        </div>
    );
};

export {Sketchbox};
