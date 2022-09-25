import { fetchUserFromFreshDesk } from "../../src/fetch/index";
const INVALID_KEY = "Xrb0b0PYA551WVzCX";
const VALID_KEY = "Xrb0b0PYA551WVzCXO";
const VALID_SUBDOMAIN = "filip";
const INVALID_SUBDOMAIN = "ivan";
describe("Fetch User from Github API", () => {
    test("should return invalid credentials when the token is invalid", async () => {
        const data = await fetchUserFromFreshDesk(VALID_SUBDOMAIN, INVALID_KEY);
        expect(data).toHaveProperty('status', 401);
    });
    test("should return invalid credentials when the subdomain is invalid", async () => {
        const data = await fetchUserFromFreshDesk(INVALID_SUBDOMAIN, VALID_KEY);
        expect(data).toHaveProperty('status', 401);
    });
    test("should return invalid credentials when the subdomain is invalid and the token is invalid", async () => {
        const data = await fetchUserFromFreshDesk(INVALID_SUBDOMAIN, INVALID_KEY);
        expect(data).toHaveProperty('status', 401);
    });
    test("should return a list of contacts", async () => {
        const data = await fetchUserFromFreshDesk(VALID_SUBDOMAIN, VALID_KEY);
        expect(Array.isArray(data)).toBe(true);
    });
})