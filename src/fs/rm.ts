/**
 * @module filesmith/fs/rm
 * Recursively remove a path from the file system
 */

import fs from "fs";
import {resolve} from "path";
import {promisify} from "util";

/**
 * @see {@link https://nodejs.org/api/util.html#util_util_promisify_original|promisify}
 * Promisify standard-callback functions that we'll be using
 */
const lstatP = promisify(fs.lstat);
const rmdirP = promisify(fs.rmdir);
const readdirP = promisify(fs.readdir);
const unlinkP = promisify(fs.unlink);

/**
 * Remove the children of a directory
 */
const rmdirChildren = (path: string) => readdirP(path)
    .then((files) => Promise.all(files.map((file) => rm(resolve(path, file)))));

/**
 * Remove a directory and (if exists) the directory's children
 */
const rmdir = (path: string): Promise<void> => rmdirP(path)
    .catch((err) => (err && err.code === "ENOTEMPTY")
        ? rmdirChildren(path).then(() => rmdir(path))
        : Promise.reject(err));

/**
 * Recursively remove a node at the input getFixturePath
 */
export const rm = (path: string): Promise<void> => lstatP(path)
    .then((stats: fs.Stats) => stats.isDirectory() ? rmdir(path) : unlinkP(path))
    .catch((err) => (err && err.code === "ENOENT") ? Promise.resolve() : Promise.reject(err));
