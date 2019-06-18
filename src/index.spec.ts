import { resolve } from "path";
import fs from "fs";
import {filesmith} from "./";
import {promisify} from "util";

const lstatP = promisify(fs.lstat);
const readFileP = promisify(fs.readFile);

describe("filesmith", () => {
    const {setup, teardown, getFixturePath} = filesmith({
        directory1: {
            "file1.txt": "mock content 1"
        },
        directory2: {
            directory3: {}
        }
    });

    describe("setup", () => {
        beforeAll(setup);
        afterAll(teardown);

        it("can creates files", () =>
            expect(readFileP(resolve(getFixturePath(), "directory1/file1.txt"), "utf8"))
                .resolves.toBe("mock content 1"));

        it("can create a directory", () =>
            expect(lstatP(resolve(getFixturePath(), "directory2"))
                .then((stats: fs.Stats): boolean => stats.isDirectory())
            ).resolves.toBeTruthy());

        it("can create nested directories", () =>
            expect(lstatP(resolve(getFixturePath(), "directory2", "directory3"))
                .then((stats: fs.Stats): boolean => stats.isDirectory())
            ).resolves.toBeTruthy());

    });

    describe("teardown", () => {
        beforeAll(setup);
        it("removes the fixtures directory", () => expect(
            lstatP(getFixturePath())
                .then((stats) => expect(stats.isDirectory()).toBeTruthy())
                .then(teardown)
                .then(() => lstatP(getFixturePath()))
                .catch((err) => err.code)
        ).resolves.toBe("ENOENT"));

        describe("when there's nothing to teardown", () => {
            beforeAll(teardown);
            it("succeeds since technically it's not there", () => expect(teardown()).resolves.toBe(undefined));
        });
    });
});
