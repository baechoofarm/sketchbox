import React from "react";
import {FontColorsOutlined} from "@ant-design/icons";
import {InnerSelect, SelectOption} from "../../../../../internal";
import s from "./fontColorInnerSelect.scss";

interface Props {
    visible: boolean;
}

const FontColorInnerSelect: React.FC<Props> = ({visible}) => {
    const fontColorOptions: SelectOption[] = [
        {title: "red", value: "red", renderer: () => (<FontColorsOutlined className={s.red}/>)},
        {title: "green", value: "green", renderer: () => (<FontColorsOutlined className={s.green}/>)},
        {title: "blue", value: "blue", renderer: () => (<FontColorsOutlined className={s.blue}/>)},
        {title: "yellow", value: "yellow", renderer: () => (<FontColorsOutlined className={s.yellow}/>)},
        {title: "violet", value: "violet", renderer: () => (<FontColorsOutlined className={s.violet}/>)},
    ];

    const handleClick = () => {
        // nothing
    };

    return (
        <InnerSelect
            options={fontColorOptions}
            selectedValue={<FontColorsOutlined/>}
            visible={visible}
            changeFunc={handleClick}
        />
    );
};

export {FontColorInnerSelect};
