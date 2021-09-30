import React, {useEffect, useState} from "react";
import {useOverlay} from "react-overlay-layer";
import s from "./innerSelect.scss";

interface Props {
    options: string[];
    visible: boolean;
}

const InnerSelect: React.FC<Props> = props => {
    const {options, visible, children} = props;

    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    const overlay = useOverlay(ov => {
        if (targetRect) {
            const {left, bottom} = targetRect;

            return (
                <div style={{left, top: bottom + 5}} className={s.options}>
                    {options.map(option => (
                        <div key={option} onClick={() => ov.close()} className={s.option}>
                            {option}
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

    const handleMouseDown = (e: React.MouseEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setTargetRect(e.currentTarget.getBoundingClientRect());
        overlay.open();
    };

    return (
        <div onMouseDown={handleMouseDown}>{children}</div>
    );
};

export {InnerSelect};
