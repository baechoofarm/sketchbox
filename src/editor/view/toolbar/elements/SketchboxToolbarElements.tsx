import React from "react";
import {
    BulletedButton,
    CheckboxButton,
    LinkButton,
    NumberedButton,
    SketchboxToolbarRow,
    UnLinkButton
} from "../../../../internal";

const SketchboxToolbarElements: React.FC = () => {
    return (
        <SketchboxToolbarRow>
            <BulletedButton/>
            <NumberedButton/>
            <LinkButton/>
            <UnLinkButton/>
            <CheckboxButton/>
        </SketchboxToolbarRow>
    );
};

export {SketchboxToolbarElements};
