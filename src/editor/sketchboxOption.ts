import {MentionMember} from "../internal";

export enum EditorMode {
    READ = 'READ',
    WRITE = 'WRITE'
}

export interface SketchboxOption {
    mode?: EditorMode;
    modeChangeable?: boolean;
    mentionable?: boolean;
    mentionableMembers?: MentionMember[];

    onModeChange?(mode: EditorMode): void;
}
