import React, {useState} from "react";
import {useOverlay} from "react-overlay-layer";
import {useFocused, useSelected} from "slate-react";
import classNames from "classnames";
import {
    LinkElement,
    SketchboxElementProps,
    useSketchboxOption,
    LinkElementToolbar
} from "../../../../../internal";
import s from "./linkElementItem.scss";

export interface LinkElementItemProps extends SketchboxElementProps<LinkElement> {

}

const LinkElementItem: React.FC<LinkElementItemProps> = props => {
    const {attributes, element, children} = props;

    const selected = useSelected();
    const focused = useFocused();

    const {isReadMode} = useSketchboxOption();
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    const overlay = useOverlay(ov => {
        if (targetRect) {
            const {left, bottom} = targetRect;

            return (
                <LinkElementToolbar
                    element={element}
                    onClose={() => {
                        ov.close();
                        setTargetRect(null);
                    }}
                    style={{
                        left,
                        top: bottom + 5,
                        position: "absolute"
                    }}
                />
            );
        }
        return null;
    });

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!isReadMode) {
            setTargetRect(e.currentTarget.getBoundingClientRect());
            overlay.open();
        }
    };

    return (
        <a
            {...attributes}
            className={classNames(s.link, {
                [s.focused]: selected && focused
            })}
            href={element.url}
            onMouseDown={handleMouseDown}
        >
            {children}
        </a>
    );
};

export {LinkElementItem};
