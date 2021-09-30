import React, {useEffect, useState} from "react";
import {useOverlay} from "react-overlay-layer";
import s from "./innerSelect.scss";

export interface SelectOption {
    title: string;
    value: any;
    renderer?: () => React.ReactElement;
}

interface Props {
    options: SelectOption[];
    selectedValue: any;
    visible: boolean;
    changeFunc: (value: any) => void;
}

const InnerSelect: React.FC<Props> = props => {
    const {options, visible, changeFunc, selectedValue} = props;

    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    const overlay = useOverlay(ov => {
        if (targetRect) {
            const {left, bottom} = targetRect;

            return (
                <div style={{left, top: bottom + 5}} className={s.options}>
                    {options.map(option => (
                        <div key={option.title} onClick={() => handleClick(option.value)} className={s.option}>
                            {option.renderer ? option.renderer() : option.title}
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    });

    useEffect(() => {
        if (!visible) overlay.close();
    });

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setTargetRect(e.currentTarget.getBoundingClientRect());
        overlay.open();
    };

    const handleClick = (font: any) => {
        changeFunc(font);
        overlay.close();
    };

    let selected = options.find(option => option.value === selectedValue)?.title ?? "None";
    if (selected.length < 1) selected = "None";
    if (typeof selectedValue === "object" && selectedValue !== null) selected = selectedValue;

    return (
        <div
            className={s.select}
            onMouseDown={handleMouseDown}
        >
            {selected}
        </div>
    );
};

export {InnerSelect};
