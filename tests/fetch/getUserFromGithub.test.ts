import { fetchUserFromGithub } from "../../src/fetch";
const INVALID_KEY = "ghp_QviHEOsiJ52OhVusN4i4ne9N2xeGtj1Vrji";
const VALID_KEY = "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";
const VALID_USERNAME = "FilipStoyanov";
const INVALID_USERNAME = "george";
const BAD_REQUEST_OBJECT = {
    "message": "Bad credentials",
    "status": 401
};

describe("Fetch User from Github API", () => {
    test("should return bad credentials with invalid key", async () => {
        const data = await fetchUserFromGithub(VALID_USERNAME, INVALID_KEY);
        expect(data).toMatchObject(BAD_REQUEST_OBJECT);
    });
    test("should return bad credentials with invalid key", async () => {
        const data = await fetchUserFromGithub(INVALID_USERNAME, INVALID_KEY);
        expect(data).toMatchObject(BAD_REQUEST_OBJECT);
    });
    test("should return right name with valid username and valid key", async () => {
        const data = await fetchUserFromGithub(VALID_USERNAME, VALID_KEY);
        expect(data).toHaveProperty('name', 'Filip Stoyanov');
    });
})