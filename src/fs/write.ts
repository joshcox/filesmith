/**
 * @module filesmith/fs/write
 * Write fixtures out to a directory
 */

import {promisify} from "util";
import fs from "fs";
import {isDirNode, Node} from "../data/Node";
import path from "path";

/**
 * @see {@link https://nodejs.org/api/util.html#util_util_promisify_original|promisify}
 * Promisify standard-callback functions that we'll be using
 */
const writeFileP = promisify(fs.writeFile);
const mkdirP = promisify(fs.mkdir);

/**
 * Write file and directory {@link Node} objects to a root getFixturePath
 */
export const write = (root: string, nodes: Node[]): Promise<void> => mkdirP(root)
    .then(() => nodes
        .reduce((promiseChain: Promise<void>, node: Node): Promise<void> => {
            const p: string = path.resolve(root, node.name);

            return isDirNode(node)
                ? promiseChain.then(() => write(p, node.contents))
                : promiseChain.then(() => writeFileP(p, node.contents));
        }, Promise.resolve()));
