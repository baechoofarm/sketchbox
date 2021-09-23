import {useContext} from "react";
import {EditorMode, SketchboxContext} from "../../internal";

export function useSketchboxOption() {
    const {
        mode, onModeChange,
        mentionable, mentionableMembers
    } = useContext(SketchboxContext);

    const isReadMode = mode === EditorMode.READ;

    return {
        mode,
        isReadMode,
        onModeChange,
        mentionable,
        mentionableMembers: mentionableMembers ?? []
    };
}
