import {useContext} from "react";
import {LightBoxContext} from "../../../internal";

export function useLightBoxOption() {
    const {mentionable, mentionableMembers} = useContext(LightBoxContext);

    return {
        mentionable,
        mentionableMembers: mentionableMembers ?? []
    };
}
