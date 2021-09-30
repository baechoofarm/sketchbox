import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import {ReactEditor, useSlate} from "slate-react";
import {Editor, Range} from "slate";
import {getLeafOfSelection, FontFamilyInnerSelect} from "../../../../internal";
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
    const [domSelection, setDomSelection] = useState<Selection | null>(null);
    const [isVisible, setVisible] = useState(false);

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
            if (selection) {
                setVisible(false);
            }
            return;
        }

        const domRange = domSelection?.getRangeAt(0);
        if (domRange) {
            const rect = domRange.getBoundingClientRect();

            el.style.display = "block";
            el.style.top = `${rect.top - el.offsetHeight - 10}px`;
            el.style.left = `${rect.left - el.offsetWidth / 2 + rect.width / 2}px`;

            setVisible(true);
        }

        if (selection) {
            const leaf = getLeafOfSelection(editor);
            setFontSize(leaf?.[0]?.fontSize ?? 14);
        }

    });

    return (
        <Portal>
            <div className={s.toolbar} ref={ref}>
                Font Size : {fontSize}
                <FontFamilyInnerSelect visible={isVisible}/>
            </div>
        </Portal>
    );
};

export {HoveringToolbar};
