import { merge } from "./merge";

describe("IFileSmithFixture merging", () => {
    it("merges two empty fixtures into an empty fixture", () => {
        expect(merge({}, {})).toEqual({});
    });

    it("recursively merges properties from the source to the target fixture object", () => {
        expect(merge({}, { a: "a" })).toEqual({ a: "a" });
        expect(merge({}, { a: { b: "b" } })).toEqual({ a: { b: "b" } });
        expect(merge({ a: { c: "c" } }, { a: { b: "b" } })).toEqual({ a: { b: "b", c: "c" } });
        expect(merge({ a: { c: "c" } }, { a: { b: "b", c: "d" } })).toEqual({ a: { b: "b", c: "d" } });
    });
});
