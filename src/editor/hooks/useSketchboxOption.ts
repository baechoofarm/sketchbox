import {useContext} from "react";
import {EditorMode, SketchboxContext} from "../../internal";

export function useSketchboxOption() {
    const {
        mode, onModeChange, onImageTempUpload,
        mentionable, mentionableMembers
    } = useContext(SketchboxContext);

    const isReadMode = mode === EditorMode.READ;

    return {
        mode,
        isReadMode,
        onModeChange,
        onImageTempUpload,
        mentionable,
        mentionableMembers: mentionableMembers ?? []
    };
}
