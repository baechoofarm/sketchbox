import React, {useCallback, useContext, useState} from "react";
import {Slate} from "slate-react";
import {Range} from "slate";
import {OverlayRoot} from "react-overlay-layer";
import {
    SketchboxContent,
    SketchboxContext,
    SketchboxEditor,
    SketchboxToolbar,
    HoveringToolbar,
    SketchboxValue, useFormatCommands, useImage, useMention, useNestedList
} from "../../internal";

interface Props {
    editor: SketchboxEditor;
    value: SketchboxValue;
    onChangeValue: (value: SketchboxValue) => void;
}

const SketchboxView: React.FC<Props> = ({editor, value, onChangeValue}) => {
    const {formatChangers: {fontSize, fontFamily, fontColor, backgroundColor}} = useContext(SketchboxContext);

    const [target, setTarget] = useState<Range | null>(null);

    const [_value, setValue] = useState<SketchboxValue>(value);

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

    const onBlur = useCallback((event: React.FocusEvent) => {
        onChangeValue(_value);
    }, [onChangeValue, _value]);

    return (
        <Slate editor={editor} value={_value} onChange={onChange}>
            <SketchboxToolbar/>
            <HoveringToolbar/>
            <SketchboxContent onKeyDown={onKeyDown} onBlur={onBlur}/>
            <OverlayRoot/>
        </Slate>
    );
};

export {SketchboxView};
