import React, {useContext} from "react";
import cn from "classnames";
import {InnerSelect, SelectOption, SketchboxContext} from "../../../../../internal";
import s from "./backgroundColorInnerSelect.scss";

interface Props {
    visible: boolean;
}

const BackgroundColorInnerSelect: React.FC<Props> = ({visible}) => {
    const backgroundColorOptions: SelectOption[] = [
        {title: "white", value: "white", renderer: () => (<div className={cn(s.option, s.white)}>A</div>)},
        {title: "red", value: "red", renderer: () => (<div className={cn(s.option, s.red)}>A</div>)},
        {title: "green", value: "green", renderer: () => (<div className={cn(s.option, s.green)}>A</div>)},
        {title: "blue", value: "blue", renderer: () => (<div className={cn(s.option, s.blue)}>A</div>)},
        {title: "yellow", value: "yellow", renderer: () => (<div className={cn(s.option, s.yellow)}>A</div>)},
        {title: "violet", value: "darkviolet", renderer: () => (<div className={cn(s.option, s.violet)}>A</div>)},
        {title: "black", value: "black", renderer: () => (<div className={cn(s.option, s.black)}>A</div>)},
    ];

    const {value, change} = useContext(SketchboxContext).formatChangers.backgroundColor;

    const handleClick = (color: string) => {
        change(color);
    };

    return (
        <InnerSelect
            options={backgroundColorOptions}
            selectedValue={value}
            visible={visible}
            changeFunc={handleClick}
        />
    );
};

export {BackgroundColorInnerSelect};
