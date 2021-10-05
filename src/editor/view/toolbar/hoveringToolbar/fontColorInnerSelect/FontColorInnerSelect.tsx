import React, {useContext} from "react";
import {FontColorsOutlined} from "@ant-design/icons";
import {InnerSelect, SelectOption, SketchboxContext} from "../../../../../internal";
import s from "./fontColorInnerSelect.scss";

interface Props {
    visible: boolean;
}

const FontColorInnerSelect: React.FC<Props> = ({visible}) => {
    const fontColorOptions: SelectOption[] = [
        {title: "black", value: "black", renderer: () => (<FontColorsOutlined className={s.black}/>)},
        {title: "red", value: "red", renderer: () => (<FontColorsOutlined className={s.red}/>)},
        {title: "green", value: "green", renderer: () => (<FontColorsOutlined className={s.green}/>)},
        {title: "blue", value: "blue", renderer: () => (<FontColorsOutlined className={s.blue}/>)},
        {title: "yellow", value: "yellow", renderer: () => (<FontColorsOutlined className={s.yellow}/>)},
        {title: "violet", value: "darkviolet", renderer: () => (<FontColorsOutlined className={s.violet}/>)},
        {title: "white", value: "white", renderer: () => (<FontColorsOutlined className={s.white}/>)},
    ];

    const {value, change} = useContext(SketchboxContext).formatChangers.fontColor;

    const handleClick = (fontColor: string) => {
        change(fontColor);
    };

    return (
        <InnerSelect
            options={fontColorOptions}
            selectedValue={value}
            visible={visible}
            changeFunc={handleClick}
        />
    );
};

export {FontColorInnerSelect};
