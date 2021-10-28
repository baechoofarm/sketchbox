import {ImageInfo, MentionMember, SketchboxValue} from "../internal";

export enum EditorMode {
    READ = 'READ',
    WRITE = 'WRITE'
}

export interface SketchboxOption {
    mode?: EditorMode;
    modeChangeable?: boolean;
    mentionable?: boolean;
    mentionableMembers?: MentionMember[];
    value: SketchboxValue;

    onValueChange(value: SketchboxValue): void;

    onModeChange?(mode: EditorMode): void;

    onImageTempUpload?(image: Blob): Promise<ImageInfo>;
}
