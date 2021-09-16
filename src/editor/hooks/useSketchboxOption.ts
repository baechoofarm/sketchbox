import {useContext} from "react";
import {EditorMode, SketchboxContext} from "../../internal";

export function useSketchboxOption() {
    const {mode, onModeChange} = useContext(SketchboxContext);

    const isReadMode = mode === EditorMode.READ;

    return {
        mode, onModeChange, isReadMode
    };
}
