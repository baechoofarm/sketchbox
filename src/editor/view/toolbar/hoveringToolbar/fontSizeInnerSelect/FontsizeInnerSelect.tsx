import React, {useContext} from "react";
import {SketchboxContext} from "../../../../sketchboxContext";
import {InnerSelect, SelectOption} from "../../../gadget/innerSelect/InnerSelect";

interface Props {
    visible: boolean;
}

const FontsizeInnerSelect: React.FC<Props> = ({visible}) => {
    const fontSizeOptions: SelectOption[] = [];
    for (let i = 6; i < 20; i += 2) {
        fontSizeOptions.push({title: String(i), value: i});
    }

    const {value, change} = useContext(SketchboxContext).formatChangers.fontSize;

    const handleClick = (size: string) => {
        change(Number(size));
    };

    return (
        <InnerSelect
            options={fontSizeOptions}
            selectedValue={value}
            visible={visible}
            changeFunc={handleClick}
        />
    );
};

export {FontsizeInnerSelect};
