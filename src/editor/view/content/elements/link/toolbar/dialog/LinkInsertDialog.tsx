import React, {CSSProperties, useCallback, useMemo, useState} from "react";
import {BaseSelection, Transforms} from "slate";
import {EyeOutlined, LinkOutlined} from "@ant-design/icons";
import {useSlate} from "slate-react";
import s from "./linkInsertDialog.scss";
import {LinkElement, SketchboxText, useLink} from "../../../../../../../internal";

interface Props {
    style: CSSProperties;
    element: LinkElement;
    selection: BaseSelection;
}

const LinkInsertDialog: React.FC<Props> = ({style, element, selection}) => {
    const [url, setUrl] = useState(element.url);
    const [text, setText] = useState((element.children[0] as SketchboxText).text);

    const editor = useSlate();
    const [wrapLink] = useLink();
    const select = useMemo(() => selection, []);

    const onUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    }, []);

    const onTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }, []);

    const onBlur = useCallback(() => {
        Transforms.select(editor, select ?? []);

        wrapLink(url, text);
    }, [wrapLink, url, text, editor, select]);

    return (
        <div style={style} className={s.dialog}>
            <div>
                <LinkOutlined className={s.icon}/>
                <input
                    className={s.input}
                    value={url}
                    onChange={onUrlChange}
                    onBlur={onBlur}
                />
            </div>
            <div>
                <EyeOutlined className={s.icon}/>
                <input
                    className={s.input}
                    value={text}
                    onChange={onTextChange}
                    onBlur={onBlur}
                />
            </div>
        </div>
    );
};

export {
    LinkInsertDialog
};
