import React from "react";
import {
    BulletedButton,
    CheckboxButton,
    LinkButton,
    NumberedButton,
    SketchboxToolbarRow,
    UnLinkButton,
    ImageButton
} from "../../../../internal";

const SketchboxToolbarElements: React.FC = () => {
    return (
        <SketchboxToolbarRow>
            <BulletedButton/>
            <NumberedButton/>
            <LinkButton/>
            <UnLinkButton/>
            <CheckboxButton/>
            <ImageButton/>
        </SketchboxToolbarRow>
    );
};

export {SketchboxToolbarElements};
