import React, {useMemo} from "react";
import cn from "classnames";
import {
    createSketchboxEditor,
    SketchboxOption,
    SketchboxContext,
    useFontSizeFormatChanger,
    useFontFamilyFormatChanger,
    SketchboxView
} from "../internal";
import s from "./sketchbox.scss";
import {useFontColorFormatChanger} from "./hooks/text/format/formats/useFontColorFormatChanger";

interface Props {
    className?: string;
    option: SketchboxOption;
}

const Sketchbox: React.FC<Props> = ({option, className}) => {
    const editor = useMemo(() => createSketchboxEditor(), []);

    const fontSize = useFontSizeFormatChanger(editor);
    const fontFamily = useFontFamilyFormatChanger(editor);
    const fontColor = useFontColorFormatChanger(editor);

    return (
        <div className={className ? cn(s.sketchbox, className) : s.sketchbox}>
            <SketchboxContext.Provider
                value={{
                    ...(option ?? {}),
                    formatChangers: {fontSize, fontFamily, fontColor}
                }}
            >
                <SketchboxView editor={editor}/>
            </SketchboxContext.Provider>
        </div>
    );
};

export {Sketchbox};
