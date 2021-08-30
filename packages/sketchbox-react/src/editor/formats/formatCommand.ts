import {SketchboxEditor} from "sketchbox";

type FormatFunction = (editor: SketchboxEditor) => void;
export class FormatCommand {
    constructor(key: string, formatFunc: FormatFunction) {
        this.key = key;
        this.formatFunc = formatFunc;
    }

    key: string;
    formatFunc: FormatFunction;
}
