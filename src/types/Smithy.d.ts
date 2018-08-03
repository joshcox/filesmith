/**
 * @module smithy/types/Smithy
 * Input and Output types of Smithy
 */

export interface SmithyFixtures {
    [name: string]: SmithyFixtures | string;
}

export interface Smithy {
    getFixturePath(): string;
    setup(): Promise<string>;
    teardown(): Promise<void>;
}