import React, {useRef} from "react";
import {useSlate} from "slate-react";
import {PictureOutlined} from "@ant-design/icons";
import {SketchboxToolbarButton} from "../../common/SketchboxToolbarButton";
import {insertImage, insertTempImage} from "../../../../model/elements/image/images";
import {useSketchboxOption} from "../../../../hooks/useSketchboxOption";

const ImageButton: React.FC = () => {
    const editor = useSlate();
    const {onImageTempUpload} = useSketchboxOption();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = event.currentTarget;

        if (files?.length) {
            if (onImageTempUpload) {
                insertTempImage(editor, files[0], onImageTempUpload);
            } else {
                insertImage(editor, files[0]);
            }
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
