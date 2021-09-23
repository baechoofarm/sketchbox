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

interface Props {
    className?: string;
    option: SketchboxOption;
}

const Sketchbox: React.FC<Props> = ({option, className}) => {
    const editor = useMemo(() => createSketchboxEditor(), []);

    const fontSize = useFontSizeFormatChanger(editor);
    const fontFamily = useFontFamilyFormatChanger(editor);

    return (
        <div className={className ? cn(s.sketchbox, className) : s.sketchbox}>
            <SketchboxContext.Provider
                value={{
                    ...(option ?? {}),
                    formatChangers: {fontSize, fontFamily}
                }}
            >
                <SketchboxView editor={editor}/>
            </SketchboxContext.Provider>
        </div>
    );
};

export {Sketchbox};
