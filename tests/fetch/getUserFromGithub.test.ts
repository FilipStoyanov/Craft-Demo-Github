const fetchUserFromGithubLib = require("../../src/fetch/index.ts");
const INVALID_KEY = "ghp_QviHEOsiJ52OhVusN4i4ne9N2xeGtj1Vrji";
const VALID_KEY = "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";
const VALID_USERNAME = "FilipStoyanov";
const INVALID_USERNAME = "george";
const BAD_REQUEST_OBJECT = {
    "message": "Bad credentials",
    "documentation_url": "https://docs.github.com/rest"
};

describe("Fetch User from Github API", () => {
    test("should return bad credentials with invalid key", async () => {
        const data = await fetchUserFromGithubLib.fetchUserFromGithub(VALID_USERNAME, INVALID_KEY);
        expect(data).toMatchObject(BAD_REQUEST_OBJECT);
    });
    test("should return bad credentials with invalid key", async () => {
        const data = await fetchUserFromGithubLib.fetchUserFromGithub(INVALID_USERNAME, INVALID_KEY);
        expect(data).toMatchObject(BAD_REQUEST_OBJECT);
    });
    test("should return right name with valid username and valid key", async () => {
        const data = await fetchUserFromGithubLib.fetchUserFromGithub(VALID_USERNAME, VALID_KEY);
        expect(data).toHaveProperty('name', 'Filip Stoyanov');
    });
})