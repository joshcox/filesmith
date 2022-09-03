/**
 * @module filesmith/types/filesmith
 * Input and Output types of filesmith
 */

export type Fixtures = {
    [name: string]: Fixtures | string;
};

export type Options = { 
    fixturePath?: string 
};

/**
 * @deprecated Use FileSmithFixtures instead
 */
export type IFilesmithFixtures = Fixtures;

export type FileSmith = {
    getFixturePath(): string;
    setup(): Promise<string>;
    teardown(): Promise<void>;
};

/**
 * @deprecated Use FileSmith instead
 */
export type IFileSmith = FileSmith;
