/**
 * @module filesmith/types/filesmith
 * Input and Output types of filesmith
 */

export interface IFilesmithFixtures {
    [name: string]: IFilesmithFixtures | string;
}

export interface IFileSmith {
    getFixturePath(): string;
    setup(): Promise<string>;
    teardown(): Promise<void>;
}
