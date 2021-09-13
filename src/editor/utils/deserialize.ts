import {jsx} from 'slate-hyperscript';

const ELEMENT_TAGS = {
    A: (el: HTMLElement) => ({type: 'link', url: el.getAttribute('href')}),
    BLOCKQUOTE: () => ({type: 'quote'}),
    H1: () => ({type: 'heading-one'}),
    H2: () => ({type: 'heading-two'}),
    H3: () => ({type: 'heading-three'}),
    H4: () => ({type: 'heading-four'}),
    H5: () => ({type: 'heading-five'}),
    H6: () => ({type: 'heading-six'}),
    IMG: (el: HTMLElement) => ({type: 'image', url: el.getAttribute('src')}),
    LI: () => ({type: 'list-item'}),
    OL: () => ({type: 'numbered-list'}),
    P: () => ({type: 'paragraph'}),
    PRE: () => ({type: 'code'}),
    UL: () => ({type: 'bulleted-list'}),
};

type ETAGS = 'A' | 'BLOCKQUOTE' | 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'IMG' | 'LI' | 'OL' | 'P' | 'PRE' | 'UL';

const TEXT_TAGS = {
    CODE: () => ({code: true}),
    DEL: () => ({strikethrough: true}),
    EM: () => ({italic: true}),
    I: () => ({italic: true}),
    S: () => ({strikethrough: true}),
    STRONG: () => ({bold: true}),
    U: () => ({underline: true}),
};

type TTAGS = 'CODE' | 'DEL' | 'EM' | 'I' | 'S' | 'STRONG' | 'U';

export const deserialize = (el: HTMLElement | ChildNode) => {
    if (el.nodeType === 3) {
        return el.textContent;
    }
    if (el.nodeType !== 1) {
        return null;
    }
    if (el.nodeName === 'BR') {
        return '\n';
    }

    const {nodeName} = el;
    let parent = el;

    if (
        nodeName === 'PRE'
        && el.childNodes[0]
        && el.childNodes[0].nodeName === 'CODE'
    ) {
        parent = el.childNodes[0] as HTMLElement;
    }
    let children: any[] = Array.from(parent.childNodes)
        .map(deserialize)
        .flat();

    if (children.length === 0) {
        children = [{text: ''}];
    }

    if (el.nodeName === 'BODY') {
        return jsx('fragment', {}, children);
    }

    if (ELEMENT_TAGS[nodeName as ETAGS]) {
        const attrs = ELEMENT_TAGS[nodeName as ETAGS](el as HTMLElement);
        return jsx('element', attrs, children);
    }

    if (TEXT_TAGS[nodeName as TTAGS]) {
        const attrs = TEXT_TAGS[nodeName as TTAGS]();
        return children.map(child => jsx('text', attrs, child));
    }

    return children;
};
