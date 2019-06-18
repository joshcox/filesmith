import { IFilesmithFixtures } from "./types/FileSmith";

/**
 * Merge two `IFilesmithFixtures` object into one.
 * @throws when a duplicate fixture is found and the `override` option is set to false
 */
export const merge = (target: IFilesmithFixtures, source: IFilesmithFixtures): IFilesmithFixtures =>
    Object.keys(source).reduce((output, key) => {
        const sourceVal = source[key];
        if (typeof sourceVal === "object") {
            const outputVal = output[key];
            if (outputVal === undefined) {
                return { ...output, [key]: sourceVal };
            } else if (typeof outputVal === "object") {
                return { ...output, [key]: merge(outputVal, sourceVal) };
            }
        }

        return { ...output, [key]: sourceVal };
    }, { ...target });
