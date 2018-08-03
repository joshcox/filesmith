/**
 * @module filesmith/types/filesmith
 * Input and Output types of filesmith
 */

export interface FilesmithFixtures {
    [name: string]: FilesmithFixtures | string;
}

export interface FileSmith {
    getFixturePath(): string;
    setup(): Promise<string>;
    teardown(): Promise<void>;
}