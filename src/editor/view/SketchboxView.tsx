import React, {useCallback, useContext, useState} from "react";
import {Slate} from "slate-react";
import {Range} from "slate";
import {OverlayRoot} from "react-overlay-layer";
import {
    SketchboxContent,
    SketchboxContext,
    SketchboxEditor,
    SketchboxElementType,
    SketchboxToolbar,
    HoveringToolbar,
    SketchboxValue, useFormatCommands, useImage, useMention, useNestedList
} from "../../internal";

interface Props {
    editor: SketchboxEditor;
}

const SketchboxView: React.FC<Props> = ({editor}) => {
    const {formatChangers: {fontSize, fontFamily, fontColor, backgroundColor}} = useContext(SketchboxContext);

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
        [fontSize, fontFamily, fontColor, backgroundColor].forEach(v => v.check());
        mention.onChange();
    }, [fontFamily, fontSize, fontColor, backgroundColor, mention]);

    const onKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (mention.onKeyDown(event)) return;
        if (nestedList.onKeyDown(event)) return;
        if (image.onKeyDown(event)) return;
        formatCommands.onKeyDown(event);
    }, [formatCommands, image, mention, nestedList]);

    return (
        <Slate editor={editor} value={value} onChange={onChange}>
            <SketchboxToolbar/>
            <HoveringToolbar/>
            <SketchboxContent onKeyDown={onKeyDown}/>
            <OverlayRoot/>
        </Slate>
    );
};

export {SketchboxView};
