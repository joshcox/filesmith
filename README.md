Generate helpers for setting up and tearing down a directory of fixtures. 

## What's it do?
1. You give `filesmith` a folder structure in the form of an object. Keep it simple - one directory at a time, please.
2. `filesmith` gives you three functions:
    * `getFixturePath :: () => string` - A function that returns the path to the root of the fixture directory
    * `setup :: () => Promise<string>` - A function that creates the directory structure originally declared to `filesmith`. It resolves with the `fixturePath`, for good measure.
    * `teardown :: () => Promise<void>` - A function that removes the directory structure

### NOTE
* If you're `setup`ing the same fixture directory more than once - do your due diligence and `teardown` between calls to `setup`

## Usage
```typescript
import filesmith from "filesmith";

describe("filesmith Usage Example", () => {
    const {setup, teardown, getFixturePath} = filesmith({
        "directory1": {
            "file1.txt": "mock content 1"
        },
        "directory2": {
            "directory3": {}
        }
    });

     beforeAll(setup);
     afterAll(teardown);

     it("can creates files", () =>
         expect(readFileP(path.resolve(getFixturePath(), "directory1/file1.txt"), "utf8"))
             .resolves.toBe("mock content 1"));

     it("can create a directory", () =>
         expect(lstatP(path.resolve(getFixturePath(), "directory2"))
             .then((stats: fs.Stats): boolean => stats.isDirectory())
         ).resolves.toBeTruthy());

     it("can create nested directories", () =>
         expect(lstatP(path.resolve(getFixturePath(), "directory2", "directory3"))
             .then((stats: fs.Stats): boolean => stats.isDirectory())
         ).resolves.toBeTruthy());
})
```
