import path, { resolve } from "path";
import fs from "fs";
import { filesmith } from "./";
import { promisify } from "util";

const lstatP = promisify(fs.lstat);
const readFileP = promisify(fs.readFile);

const fixtures = {
    directory1: {
        "file1.txt": "mock content 1"
    },
    directory2: {
        directory3: {}
    }
};

describe("filesmith", () => {
    const { setup, teardown, getFixturePath } = filesmith()(fixtures);

    describe('options', () => {
        describe('the fixturePath option', () => {
            const fixturePath = path.resolve(__dirname, 'test-fixture');
            
            const { setup, teardown, getFixturePath } = filesmith({ fixturePath })(fixtures);

            beforeAll(setup);
            afterAll(teardown);

            it('getFixturePath returns the fixturePath value', async () => {
                expect(getFixturePath()).toBe(fixturePath);
            });

            it('creates the fixture directory at fixturePath', async () => {
                const stats = await lstatP(resolve(getFixturePath()));
                expect(stats.isDirectory()).toBeTruthy();
            });
        });
    });

    describe("setup", () => {
        beforeAll(setup);
        afterAll(teardown);

        it("can creates files", async () => {
            const file = await readFileP(resolve(getFixturePath(), "directory1/file1.txt"), "utf8");
            expect(file).toBe("mock content 1");
        });

        it("can create a directory", async () => {
            const stats = await lstatP(resolve(getFixturePath(), "directory2"));
            expect(stats.isDirectory()).toBeTruthy();
        });
        
        it('can create nested directories', async () => {
            const stats = await lstatP(resolve(getFixturePath(), "directory2", "directory3"));
            expect(stats.isDirectory()).toBeTruthy();
        })
    });

    describe("teardown", () => {
        beforeAll(setup);
        it("removes the fixtures directory", async () => {
            const stats = await lstatP(getFixturePath());
            expect(stats.isDirectory()).toBeTruthy();
            await teardown();
            await expect(lstatP(getFixturePath())).rejects.toThrow();
        });

        describe("when there's nothing to teardown", () => {
            beforeAll(teardown);
            it("succeeds since technically it's not there", () => expect(teardown()).resolves.toBe(undefined));
        });
    });
});
