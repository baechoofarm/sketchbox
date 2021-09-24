import React, {useContext} from "react";
import {Input} from "antd";
import {isNaN} from "lodash";
import {SketchboxContext} from "../../../../../internal";
import s from "./fontSizeInput.scss";

function isValid(value: number | null) {
    return value !== null && value !== undefined && !isNaN(value) && Number.isFinite(value);
}

const FontSizeInput: React.FC = () => {
    const {value, change} = useContext(SketchboxContext).formatChangers.fontSize;
    const valueString = isValid(value) ? String(value) : '';

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const size = Number(e.currentTarget.value);
        if (isValid(size)) {
            change(size);
        } else {
            change(14);
        }
    };

    return (
        <Input
            className={s.input}
            type={"number"}
            value={valueString}
            onChange={onChange}
        />
    );
};

export {FontSizeInput};
