import React, {useRef} from "react";
import {useSlate} from "slate-react";
import {PictureOutlined} from "@ant-design/icons";
import {SketchboxToolbarButton} from "../../common/SketchboxToolbarButton";
import {insertImage} from "../../../../model/elements/image/images";

const ImageButton: React.FC = () => {
    const editor = useSlate();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = event.currentTarget;

        if (files?.length) {
            const reader = new FileReader();
            reader.onload = () => {
                insertImage(editor, reader.result as string);
            };
            reader.readAsDataURL(files[0]);
            event.currentTarget.value = '';
        }
    };

    return (
        <SketchboxToolbarButton onClick={handleClick}>
            <input
                ref={inputRef}
                style={{display: "none"}}
                type={"file"}
                accept={"image/*"}
                onChange={handleFileChange}
            />
            <PictureOutlined/>
        </SketchboxToolbarButton>
    );
};

export {ImageButton};
