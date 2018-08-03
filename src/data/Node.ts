/**
 * @module smithy/data/Node
 * Internal File/Directory representation
 */

import {SmithyFixtures} from "../types/Smithy";

enum NodeKind {
    Directory,
    File
}

export type Node = IDirectory | IFile;

export interface IDirectory {
    contents: Node[];
    kind: NodeKind.Directory;
    name: string;
}

export interface IFile {
    contents: string;
    kind: NodeKind.File;
    name: string;
}

/**
 * Check if an input is a {@link Node}
 */
const isNode = (node: any): node is Node => "name" in node
    && "contents" in node
    && "kind" in node
    && (node.kind === NodeKind.Directory || node.kind === NodeKind.File);

/**
 * Check if an input is an {@link IDirectory}
 */
export const isDirNode = (node: any): node is IDirectory =>
    isNode(node) && node.kind === NodeKind.Directory;

/**
 * Construct a new {@link Node} object
 */
export function create(name: string, contents: string): IFile;
export function create(name: string, contents: Node[]): IDirectory;
export function create(name: string, contents: string | Node[]) {
    return ({
        contents,
        kind: typeof contents === "string" ? NodeKind.File : NodeKind.Directory,
        name
    });
}

/**
 * Create an array of {@link Node} objects from a {@link SmithyFixtures}
 */
export const fromSmithyStructure = (fixtures: SmithyFixtures): Node[] => Object
    .keys(fixtures)
    .reduce((nodes: Node[], name: string): Node[] => {
        const contents = fixtures[name];
        return [
            ...nodes,
            typeof contents === "string"
                ? create(name, contents)
                : create(name, fromSmithyStructure(contents))
        ];
    }, []);
