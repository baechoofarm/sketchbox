import React, {useContext} from "react";
import {InnerSelect, SelectOption} from "../../../../../internal";
import {SketchboxContext} from "../../../../sketchboxContext";

interface Props {
    visible: boolean;
}

const FontFamilyInnerSelect: React.FC<Props> = ({visible}) => {
    const fontFamilyOptions: SelectOption[] = [
        {title: "None", value: ""},
        {title: "Noto Sans KR", value: "Noto Sans KR"},
        {title: "Black Han Sans", value: "Black Han Sans"},
        {title: "Yeon Sung", value: "Yeon Sung"}
    ];

    const {value, change} = useContext(SketchboxContext).formatChangers.fontFamily;

    const handleClick = (font: string) => {
        change(font);
    };

    return (
        <InnerSelect
            options={fontFamilyOptions}
            visible={visible}
            changeFunc={handleClick}
            selectedValue={value}
        />
    );
};

export {FontFamilyInnerSelect};
