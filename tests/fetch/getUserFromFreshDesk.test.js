const fetchUserFromFreshDeskLib = require("../../src/fetch/index.ts");
const INVALID_KEY = "Xrb0b0PYA551WVzCX";
const VALID_KEY = "Xrb0b0PYA551WVzCXO";
const VALID_SUBDOMAIN = "filip";
const INVALID_SUBDOMAIN = "ivan";

describe("Fetch User from Github API", () => {
    test("should return invalid credentials with invalid key", async () => {
        const data = await fetchUserFromFreshDeskLib.fetchUserFromFreshDesk(VALID_SUBDOMAIN, INVALID_KEY);
        expect(data).toHaveProperty('code', 'invalid_credentials');
    });
    test("should return invalid credentials with invalid subdomain", async () => {
        const data = await fetchUserFromFreshDeskLib.fetchUserFromFreshDesk(INVALID_SUBDOMAIN, VALID_KEY);
        expect(data).toHaveProperty('code', 'invalid_credentials');
    });
    test("should return invalid credentials with invalid subdomain and invalid key", async () => {
        const data = await fetchUserFromFreshDeskLib.fetchUserFromFreshDesk(INVALID_SUBDOMAIN, INVALID_KEY);
        expect(data).toHaveProperty('code', 'invalid_credentials');
    });
})