import React, {useMemo} from "react";
import {useSlate} from "slate-react";
import {
    FormatCommand,
    applyBoldFormat,
    applyItalicFormat,
    applyUnderlineFormat,
    applyLineThroughFormat
} from "../../../../internal";

export function useFormatCommands() {
    const editor = useSlate();
    const commands = useMemo(() => [
        new FormatCommand("b", applyBoldFormat),
        new FormatCommand("i", applyItalicFormat),
        new FormatCommand("u", applyUnderlineFormat),
        new FormatCommand("l", applyLineThroughFormat)
    ], []);

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (event.ctrlKey) {
            const executed = commands.some(command => {
                if (event.key === command.key) {
                    command.formatFunc(editor);
                    return true;
                }
                return false;
            });
            if (executed) return true;
        }
    };

    return {onKeyDown};
}
