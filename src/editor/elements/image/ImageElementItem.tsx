import React from "react";
import {useFocused, useSelected} from "slate-react";
import {ImageElement, SketchboxElementProps} from "../../../internal";

export interface ImageElementItemProps extends SketchboxElementProps<ImageElement> {

}

const ImageElementItem: React.FC<ImageElementItemProps> = ({attributes, children, element}) => {
    const selected = useSelected();
    const focused = useFocused();
    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <img
                    src={element.url}
                    style={{
                        display: 'block',
                        maxWidth: '100%',
                        maxHeight: '20em',
                        boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}`
                    }}
                    alt={"image"}
                />
            </div>
            {children}
        </div>
    );
};

export {ImageElementItem};
