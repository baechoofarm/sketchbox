import {SketchboxEditor} from "sketchbox";

type FormatFunction = (editor: SketchboxEditor) => void;
export class FormatCommand {
    constructor(command: string, formatFunc: FormatFunction) {
        this.command = command;
        this.formatFunc = formatFunc;
    }

    command: string;
    formatFunc: FormatFunction;
}
