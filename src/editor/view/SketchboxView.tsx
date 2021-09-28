import React, {useCallback, useContext, useState} from "react";
import {Slate} from "slate-react";
import {Range} from "slate";
import {OverlayRoot} from "react-overlay-layer";
import {SketchboxToolbar} from "./toolbar/SketchboxToolbar";
import {SketchboxContent} from "./content/SketchboxContent";
import {useMention} from "../hooks/element/mention/useMention";
import {useNestedList} from "../hooks/element/listed/useNestedList";
import {useFormatCommands} from "../hooks/text/format/useFormatCommands";
import {SketchboxValue} from "../model/sketchboxValue";
import {SketchboxElementType} from "../model/elements/sketchboxElementType";
import {SketchboxContext} from "../sketchboxContext";
import {SketchboxEditor} from "../model/sketchboxEditor";
import {useImage} from "../hooks/element/image/useImage";

interface Props {
    editor: SketchboxEditor;
}

const SketchboxView: React.FC<Props> = ({editor}) => {
    const {formatChangers: {fontSize, fontFamily}} = useContext(SketchboxContext);

    const [target, setTarget] = useState<Range | null>(null);

    const [value, setValue] = useState<SketchboxValue>(() => [{
        type: SketchboxElementType.PARAGRAPH,
        children: [{text: ''}]
    }]);

    const mention = useMention(editor, target, newTarget => setTarget(newTarget));
    const image = useImage(editor);
    const nestedList = useNestedList(editor);
    const formatCommands = useFormatCommands(editor);

    const onChange = useCallback((newValue: SketchboxValue) => {
        setValue(newValue);
        [fontSize, fontFamily].forEach(v => v.check());
        mention.onChange();
    }, [fontFamily, fontSize, mention]);

    const onKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (mention.onKeyDown(event)) return;
        if (nestedList.onKeyDown(event)) return;
        if (image.onKeyDown(event)) return;
        formatCommands.onKeyDown(event);
    }, [formatCommands, image, mention, nestedList]);

    return (
        <Slate editor={editor} value={value} onChange={onChange}>
            <SketchboxToolbar/>
            <SketchboxContent onKeyDown={onKeyDown}/>
            <OverlayRoot/>
        </Slate>
    );
};

export {SketchboxView};
