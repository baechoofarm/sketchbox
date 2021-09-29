import React, {useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import {ReactEditor, useSlate} from "slate-react";
import {Editor, Range} from "slate";

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
            el.style.opacity = '0';
            return;
        }
        const domSelection = window.getSelection();
        const domRange = domSelection!.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();
        el.style.opacity = '1';
        el.style.top = `${rect.top + window.pageXOffset - el.offsetHeight - 10}px`;
    });

    return (
        <Portal>
            <div style={{opacity: 0, position: "absolute"}} ref={ref}>
                🎈🎈Hovering by Drag!!🎈🎈
            </div>
        </Portal>
    );
};

export {HoveringToolbar};
