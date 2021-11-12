import {Editor, Element, Range, Transforms} from "slate";
import {ReactEditor} from "slate-react";
import {SketchboxEditor, SketchboxElement, SketchboxElementType, SketchboxText} from "../../../../../internal";

const isListActive = (editor: SketchboxEditor) => {
    const [match] = Editor.nodes(editor, {
        match: n => !Editor.isEditor(n)
            && Element.isElement(n)
            && (n.type === SketchboxElementType.NUMBERED || n.type === SketchboxElementType.BULLETED),
    });

    return !!match;
};

const isListNested = (editor: SketchboxEditor) => {
    const {selection} = editor;

    if (selection) {
        const node = Editor.parent(editor, selection);
        const parent = Editor.parent(editor, selection, {depth: node[1].length - 1});
        const parentNode = parent[0] as SketchboxElement;

        if (parentNode && (parentNode.type === SketchboxElementType.BULLETED || parentNode.type === SketchboxElementType.NUMBERED)) {
            return true;
        }
    }

    return false;
};

const getListType = (editor: SketchboxEditor) => {
    const [match] = Editor.nodes(editor, {
        match: n => !Editor.isEditor(n)
            && Element.isElement(n)
            && (n.type === SketchboxElementType.BULLETED)
    });

    return match ? SketchboxElementType.BULLETED : SketchboxElementType.NUMBERED;
};

const unWrapList = (editor: SketchboxEditor, isActive: boolean) => {
    Transforms.unwrapNodes(editor, {
        match: n => (
            !Editor.isEditor(n) && Element.isElement(n)
            && (n.type === SketchboxElementType.BULLETED || n.type === SketchboxElementType.NUMBERED)
        ),
        split: true
    });

    const newProperties: Partial<SketchboxElement> = {
        type: isActive ? SketchboxElementType.PARAGRAPH : SketchboxElementType.LIST
    };

    Transforms.setNodes(editor, newProperties);
};

export const toggleList = (editor: SketchboxEditor, type: SketchboxElementType) => {
    const isActive = isListActive(editor);

    unWrapList(editor, isActive);

    if (!isActive && (type === SketchboxElementType.BULLETED || type === SketchboxElementType.NUMBERED)) {
        const listWrapper = {type, children: []};

        Transforms.wrapNodes(editor, listWrapper);
    }
};

export function checkDeleteList(editor: SketchboxEditor): boolean {
    const {selection} = editor;

    if (selection && Range.isCollapsed(selection)) {
        const node = Editor.parent(editor, selection);
        const isEmpty = (node[0].children[0] as SketchboxText).text.length < 1;
        const onFirstPoint = selection.anchor.offset === 0;

        if (isListActive(editor) && (isEmpty || onFirstPoint)) {
            unWrapList(editor, true);

            return true;
        }
    }
    return false;
}

export function checkIsBetweenLists(editor: SketchboxEditor): boolean {
    const {selection} = editor;

    if (selection && selection.anchor.offset === 0) {
        const {path, offset} = selection.anchor;

        const node = Editor.parent(editor, {path, offset});
        if ((node[0] as SketchboxElement).type === SketchboxElementType.LIST) return false;

        try {
            const upperPath = path.slice();
            upperPath[0]--;
            const upperNode = Editor.node(editor, {path: upperPath, offset});
            const upperIsList = (upperNode[0] as SketchboxElement).type === SketchboxElementType.LIST;

            const lowerPath = path.slice();
            lowerPath[0]++;
            const lowerNode = Editor.node(editor, {path: lowerPath, offset});
            const lowerIsList = (lowerNode[0] as SketchboxElement).type === SketchboxElementType.LIST;

            if (!upperIsList || !lowerIsList) return false;

            const upperParent = Editor.parent(editor, {path: upperPath, offset: 0});
            const lowerParent = Editor.parent(editor, {path: lowerPath, offset: 0});

            upperPath[1] = (upperParent[0] as SketchboxElement).children.length - 1;
            const {text} = (upperParent[0].children[upperParent[0].children.length - 1] as SketchboxElement).children[0] as SketchboxText;

            Transforms.select(editor,
                {
                    path: upperPath,
                    offset: text.length
                });

            Transforms.removeNodes(editor, {at: {path: lowerParent[1], offset: 0}});
            Transforms.insertNodes(editor, lowerParent[0].children);
            Transforms.removeNodes(editor, {at: {path: selection.anchor.path, offset: 0}});

            lowerParent[1][0]--;
            Transforms.select(editor, {path: lowerParent[1], offset: 0});

            while ((Editor.parent(editor, {path: selection.anchor.path, offset: 0})[0] as SketchboxElement).type === SketchboxElementType.NUMBERED) {
                Transforms.unwrapNodes(editor);
            }

            return true;
        } catch (e) {
            return false;
        }
    }
    return false;
}

export function applyNestedList(editor: SketchboxEditor) {
    const isActive = isListActive(editor);

    if (isActive) {
        const type = getListType(editor);
        const listWrapper: { type: SketchboxElementType.BULLETED | SketchboxElementType.NUMBERED, children: any[] } = {type, children: []};

        if (type === SketchboxElementType.BULLETED) Transforms.wrapNodes(editor, listWrapper);

        const {selection} = editor;
        if (!selection) return;

        const {path} = selection.anchor;
        if (path[path.length - 2] === 0) return;

        const node = Editor.parent(editor, selection);
        const wrapper = Editor.parent(editor, selection, {depth: node[1].length});

        const index = wrapper[0].children.findIndex(v => v === node[0]);
        const upperNodes = wrapper[0].children[index - 1] as SketchboxElement;

        if (!upperNodes || (upperNodes as Element).type !== SketchboxElementType.NUMBERED) {
            Transforms.wrapNodes(editor, listWrapper);
            return;
        }

        const upperNode = upperNodes.children[upperNodes.children.length - 1] as SketchboxElement;

        if (upperNode.type === SketchboxElementType.NUMBERED) {
            Transforms.wrapNodes(editor, listWrapper);
            return;
        }

        Transforms.removeNodes(editor);

        const upperPath = ReactEditor.findPath(editor, upperNode);
        Transforms.select(editor, upperPath);
        if (!editor.selection) return;

        const insertPath = editor.selection.anchor.path.slice();
        insertPath[insertPath.length - 2]++;
        insertPath.splice(insertPath.length - 1, 1);

        Transforms.insertNodes(editor, node[0], {
            at: insertPath
        });
    }
}

export function cancelNestedList(editor: SketchboxEditor) {
    const isNested = isListNested(editor);
    if (!isNested) return;

    const {selection} = editor;
    if (!selection) return;

    const node = Editor.parent(editor, selection);
    const wrapper = Editor.parent(editor, selection, {depth: node[1].length});

    if ((wrapper[0] as SketchboxElement).type === SketchboxElementType.BULLETED) {
        Transforms.unwrapNodes(editor);

        const newProps: Partial<SketchboxElement> = {
            type: SketchboxElementType.LIST
        };
        Transforms.setNodes(editor, newProps);
    } else if ((wrapper[0] as SketchboxElement).type === SketchboxElementType.NUMBERED) {
        const children = wrapper[0].children as SketchboxElement[];

        const lists = children.filter(child => child.type === SketchboxElementType.LIST);
        const isAlone = lists.length === 1;

        const destPath = selection.anchor.path.slice();
        destPath.splice(destPath.length - 2, 2);

        Transforms.select(editor, {path: selection.anchor.path, offset: (node[0].children[0] as SketchboxText).text.length});

        destPath[destPath.length - 1]++;
        Transforms.moveNodes(editor, {to: destPath});

        const index = children.findIndex(child => child === node[0]);

        // TODO : NUMBERED/BULLETED는 아래처럼 처리
        // TODO : List 경우 처리
        if (index < children.length - 1 && (children[index + 1].type === SketchboxElementType.NUMBERED || children[index + 1].type === SketchboxElementType.BULLETED)) {
            const path = selection.anchor.path.slice();
            path.splice(path.length - 1, 1);

            Transforms.removeNodes(editor, {at: path});
            Transforms.insertNodes(editor, children[index + 1]);
        }

        if (isAlone) {
            Transforms.select(editor, selection);
            Transforms.unwrapNodes(editor);
        }
    }
}
