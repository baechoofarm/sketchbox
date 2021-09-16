export enum EditorMode {
    READ = 'READ',
    WRITE = 'WRITE'
}

export interface SketchboxOption {
    mode?: EditorMode;
    modeChangeable?: boolean;

    onModeChange?(mode: EditorMode): void;
}
