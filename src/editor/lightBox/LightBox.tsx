import React, {useMemo} from "react";
import {createSketchboxEditor, LightboxView, LightBoxContext, SketchboxOption, SketchboxValue} from "../../internal";

interface Props {
    value: SketchboxValue;
    onChangeValue: (value: SketchboxValue) => void;
    option: SketchboxOption;
}

const LightBox: React.FC<Props> = ({value, onChangeValue, option}) => {
    const editor = useMemo(() => createSketchboxEditor(option), [option]);

    return (
        <LightBoxContext.Provider value={{...(option ?? {})}}>
            <LightboxView editor={editor} value={value} onChangeValue={onChangeValue}/>
        </LightBoxContext.Provider>
    );
};

export {
    LightBox
};
