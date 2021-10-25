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
        {title: "red", value: "red", renderer: () => (<div className={s.red}><FontColorsOutlined/></div>)},
        {title: "green", value: "green", renderer: () => (<div className={s.green}><FontColorsOutlined/></div>)},
        {title: "blue", value: "blue", renderer: () => (<div className={s.blue}><FontColorsOutlined/></div>)},
        {title: "yellow", value: "yellow", renderer: () => (<div className={s.yellow}><FontColorsOutlined/></div>)},
        {title: "violet", value: "darkviolet", renderer: () => (<div className={s.violet}><FontColorsOutlined/></div>)},
        {title: "white", value: "white", renderer: () => (<div className={s.white}><FontColorsOutlined/></div>)},
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
