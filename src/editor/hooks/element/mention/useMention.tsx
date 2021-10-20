import React, {useCallback, useState} from "react";
import {useOverlay} from "react-overlay-layer";
import keycode from "keycode";
import {Editor, Range, Transforms} from "slate";
import {ReactEditor} from "slate-react";
import {
    useSketchboxOption,
    MentionMember,
    insertMention,
    MentionElementDropdown,
    SketchboxEditor, useLightBoxOption
} from "../../../../internal";

type TargetChangeHandler = (range: Range | null) => void;

export function useMention(editor: SketchboxEditor, target: Range | null, onTargetChange: TargetChangeHandler, isLight?: boolean) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {mentionable, mentionableMembers} = isLight ? useLightBoxOption() : useSketchboxOption();

    const [index, setIndex] = useState(0);
    const [searchText, setSearchText] = useState('');

    const filteredList: MentionMember[] = [];

    if (mentionable) {
        for (let i = 0; i < mentionableMembers.length; i++) {
            const user = mentionableMembers[i];

            if (user.title?.toLowerCase()?.startsWith(searchText?.toLowerCase())) {
                filteredList.push(user);
            }
            if (filteredList.length >= 10) {
                break;
            }
        }
    }

    const overlay = useOverlay(ov => {
        if (target) {
            const domRange = ReactEditor.toDOMRange(editor, target);
            const {bottom, left} = domRange.getBoundingClientRect();

            return (
                <MentionElementDropdown
                    style={{
                        top: bottom + 5,
                        left
                    }}
                    members={filteredList}
                    selectedIndex={index}
                    onSelect={member => {
                        Transforms.select(editor, target);
                        insertMention(editor, member);
                        onTargetChange(null);
                        ov.close();
                    }}
                />
            );
        }
        return null;
    });

    const setTarget = useCallback((newTarget: Range | null) => {
        onTargetChange(newTarget);

        if (newTarget) overlay.open();
        else overlay.close();

        return () => overlay.close();
    }, [onTargetChange, overlay]);

    const onKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (mentionable && target) {
            switch (event.keyCode) {
                case keycode.codes.down:
                    event.preventDefault();
                    setIndex(index >= filteredList.length - 1 ? 0 : index + 1);
                    break;
                case keycode.codes.up:
                    event.preventDefault();
                    setIndex(index <= 0 ? filteredList.length - 1 : index - 1);
                    break;
                case keycode.codes.tab:
                case keycode.codes.enter:
                    event.preventDefault();
                    Transforms.select(editor, target);
                    insertMention(editor, filteredList[index]);
                    setTarget(null);
                    break;
                case keycode.codes.esc:
                    event.preventDefault();
                    setTarget(null);
            }
            return true;
        }
    }, [editor, filteredList, index, mentionable, setTarget, target]);

    const onChange = useCallback(() => {
        const {selection} = editor;

        if (mentionable && selection && Range.isCollapsed(selection)) {
            const [start] = Range.edges(selection);
            const wordBefore = Editor.before(editor, start, {unit: 'word'});
            const before = wordBefore ? Editor.before(editor, wordBefore) : null;
            const beforeRange = before ? Editor.range(editor, before, start) : null;
            const beforeText = beforeRange ? Editor.string(editor, beforeRange) : null;
            const beforeMatch = beforeText ? beforeText.match(/^@([a-zA-Z가-힣0-9]+)$/) : null;
            const after = Editor.after(editor, start);
            const afterRange = Editor.range(editor, start, after);
            const afterText = Editor.string(editor, afterRange);
            const afterMatch = afterText.match(/^(\s|$)/);

            if (beforeMatch && afterMatch) {
                setTarget(beforeRange);
                setSearchText(beforeMatch[1]);
                setIndex(0);
                return;
            }
        }
        setTarget(null);
    }, [editor, mentionable, setTarget]);

    return {index, searchText, onChange, onKeyDown};
}
