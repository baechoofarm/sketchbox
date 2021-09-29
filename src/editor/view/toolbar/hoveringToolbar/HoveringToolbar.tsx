import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import {ReactEditor, useSlate} from "slate-react";
import {Editor, Range} from "slate";
import {useOverlay} from "react-overlay-layer";
import {getLeafOfSelection} from "../../../utils/getLeafOfSelection";
import s from "./hoveringToolbar.scss";

interface Props {
}

const Portal: React.FC<Props> = ({children}) => {
    return typeof document === 'object'
        ? ReactDOM.createPortal(children, document.body)
        : null;
};

const HoveringToolbar: React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const editor = useSlate();
    const [fontSize, setFontSize] = useState(14);
    const [fontFamily, setFontFamily] = useState("None");
    const [domSelection, setDomSelection] = useState<Selection | null>(null);

    useEffect(() => {
        setDomSelection(window.getSelection());
    }, []);

    useEffect(() => {
        const el = ref.current;
        const {selection} = editor;

        if (!el) {
            return;
        }

        if (
            !selection
            || !ReactEditor.isFocused(editor)
            || Range.isCollapsed(selection)
            || Editor.string(editor, selection) === ""
        ) {
            el.style.display = "none";
            return;
        }
        const domRange = domSelection?.getRangeAt(0);
        if (domRange) {
            const rect = domRange.getBoundingClientRect();
            el.style.display = "block";
            el.style.top = `${rect.top - el.offsetHeight - 10}px`;
            el.style.left = `${rect.left - el.offsetWidth / 2 + rect.width / 2}px`;
        }

        if (selection) {
            const leaf = getLeafOfSelection(editor);
            setFontSize(leaf?.[0]?.fontSize ?? 14);
            setFontFamily(leaf?.[0]?.fontFamily ?? "None");
        }

    });

    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    const overlay = useOverlay(ov => {
        if (targetRect) {
            const {left, bottom} = targetRect;

            return (
                <div style={{left, top: bottom + 5, position: "absolute"}}>👑👑👑👑</div>
            );
        }
        return null;
    });

    return (
        <Portal>
            <div className={s.toolbar} ref={ref}>
                Font Size : {fontSize} Font Family : {fontFamily}
                <select onMouseDown={e => {
                    e.preventDefault();
                    setTargetRect(e.currentTarget.getBoundingClientRect());
                    overlay.open();
                }}
                >
                    <option>test</option>
                    <option>testfsa</option>
                </select>
            </div>
        </Portal>
    );
};

export {HoveringToolbar};
