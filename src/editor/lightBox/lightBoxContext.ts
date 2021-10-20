import React from "react";
import {SketchboxOption} from "../../internal";

export interface LightBoxContextValue extends SketchboxOption {}

export const LightBoxContext = React.createContext<LightBoxContextValue>({} as LightBoxContextValue);
