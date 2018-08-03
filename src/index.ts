/**
 * @module smithy
 * The `smithy` utility. Generate helpers for setting up and tearing down a directory of fixtures.
 */

import {randomBytes} from "crypto";
import {tmpdir} from "os";
import path from "path";
import {rm} from "./fs/rm";
import {write} from "./fs/write";
import {fromSmithyStructure} from "./data/Node";
import {Smithy, SmithyFixtures} from "./types/Smithy";

/**
 * Create a suite for smithing a fixture directory
 */
export default (fixtures: SmithyFixtures): Smithy => {
    // Create a unique file path within the operating system's temp directory
    const fixturePath: string = path.resolve(tmpdir(), randomBytes(16).toString("hex"));

    return ({
        getFixturePath: (): string => fixturePath,
        setup: (): Promise<string> => write(fixturePath, fromSmithyStructure(fixtures))
            .then(() => fixturePath),
        teardown: (): Promise<void> => rm(fixturePath)
    });
};
