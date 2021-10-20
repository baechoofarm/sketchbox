import React from "react";
import {FormatChanger, SketchboxOption} from "../internal";

export interface SketchboxContextValue extends SketchboxOption {
    formatChangers?: {
        fontSize: FormatChanger<number>;
        fontFamily: FormatChanger<string>;
        fontColor: FormatChanger<string>;
        backgroundColor: FormatChanger<string>;
    };
}

export const SketchboxContext = React.createContext<SketchboxContextValue>({} as SketchboxContextValue);
