/**
 * @module filesmith
 * The `filesmith` utility. Generate helpers for setting up and tearing down a directory of fixtures.
 */

import { randomBytes } from "crypto";
import { tmpdir } from "os";
import path from "path";
import { rm } from "./fs/rm";
import { write } from "./fs/write";
import { fromfilesmithStructure } from "./data/Node";
import { FileSmith, Fixtures, Options } from "./types/FileSmith";

export {
    FileSmith,
    Fixtures as FileSmithFixtures,
    Options as FileSmithOptions,
    IFileSmith, IFilesmithFixtures
} from "./types/FileSmith";

/**
 * Create a suite for smithing a fixture directory
 */
export const filesmith = (fixtures: Fixtures, { fixturePath }: Options = {}): FileSmith => {
    // Create a unique file path within the operating system's temp directory
    fixturePath = fixturePath ?? path.resolve(tmpdir(), randomBytes(16).toString("hex"));

    return ({
        getFixturePath: (): string => fixturePath,
        setup: async (): Promise<string> => {
            await write(fixturePath, fromfilesmithStructure(fixtures))
            return fixturePath;
        },
        teardown: (): Promise<void> => rm(fixturePath)
    });
};
