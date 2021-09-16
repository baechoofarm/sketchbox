import React, {useContext} from "react";
import {Select} from "antd";
import {SketchboxContext} from "../../../../../internal";
import s from "./fontFamilySelect.scss";

const {Option} = Select;

const FontFamilySelect: React.FC = () => {
    const {value, change} = useContext(SketchboxContext).formatChangers.fontFamily;

    const onChange = (newValue: string) => {
        change(newValue);
    };

    return (
        <Select
            className={s.select}
            value={value ?? ""}
            onChange={onChange}
        >
            <Option value={""}>None</Option>
            <Option value={"Noto Sans KR"}>Noto Sans KR</Option>
            <Option value={"Black Han Sans"}>Black Han Sans</Option>
            <Option value={"Yeon Sung"}>Black Han Sans</Option>
        </Select>
    );
};

export {FontFamilySelect};
