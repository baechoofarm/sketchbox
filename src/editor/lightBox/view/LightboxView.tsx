import React, {useCallback, useEffect, useState} from "react";
import {Range} from "slate";
import {Slate} from "slate-react";
import {OverlayRoot} from "react-overlay-layer";
import {useMention} from "../../hooks/element/mention/useMention";
import {SketchboxEditor} from "../../model/sketchboxEditor";
import {SketchboxValue} from "../../model/sketchboxValue";
import {SketchboxContent} from "../../view/content/SketchboxContent";

interface Props {
    editor: SketchboxEditor;
    value: SketchboxValue;
    onChangeValue: (value: SketchboxValue) => void;
}

const LightboxView: React.FC<Props> = ({editor, value, onChangeValue}) => {

    const [target, setTarget] = useState<Range | null>(null);

    const [_value, setValue] = useState<SketchboxValue>(value);

    const mention = useMention(editor, target, newTarget => setTarget(newTarget), true);

    useEffect(() => {
        setValue(value);
    }, [value]);

    const onChange = useCallback((newValue: SketchboxValue) => {
        setValue(newValue);
        mention.onChange();
    }, [mention]);

    const onKeyDown = useCallback((event: React.KeyboardEvent) => {
        mention.onKeyDown(event);
    }, [mention]);

    const onBlur = useCallback(() => {
        onChangeValue(_value);
    }, [onChangeValue, _value]);

    return (
        <Slate editor={editor} value={_value} onChange={onChange}>
            <SketchboxContent onKeyDown={onKeyDown} onBlur={onBlur}/>
            <OverlayRoot/>
        </Slate>
    );
};

export {
    LightboxView
};
