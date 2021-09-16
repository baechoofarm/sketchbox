import React from "react";
import {Editable} from "slate-react";
import {
    useSketchboxOption,
    SketchboxElementSwitcher,
    SketchboxFormatSwitcher,
    useNestedList, useFormatCommands,
} from "../../../internal";
import s from "../../sketchbox.scss";

interface Props {

}

const SketchboxContent: React.FC<Props> = () => {
    const {isReadMode} = useSketchboxOption();

    const nestedList = useNestedList();
    const formatCommands = useFormatCommands();

    const onKeyDown = (event: React.KeyboardEvent) => {
        if (nestedList.onKeyDown(event)) return;
        formatCommands.onKeyDown(event);
    };

    return (
        <div className={s.content}>
            <Editable
                className={s.editable}
                readOnly={isReadMode}
                renderElement={ep => (
                    <SketchboxElementSwitcher element={ep.element} attributes={ep.attributes}>
                        {ep.children}
                    </SketchboxElementSwitcher>
                )}
                renderLeaf={ep => (
                    <SketchboxFormatSwitcher leaf={ep.leaf} text={ep.text} attributes={ep.attributes}>
                        {ep.children}
                    </SketchboxFormatSwitcher>
                )}
                onKeyDown={onKeyDown}
            />
        </div>
    );
};

export {SketchboxContent};
