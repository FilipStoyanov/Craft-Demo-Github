import { updateContactFromFreshDesk } from "../../src/fetch";
const INVALID_KEY = "Xrb0b0PYA551WVzCX";
const VALID_KEY = "Xrb0b0PYA551WVzCXO";
const VALID_SUBDOMAIN = "filip";
const INVALID_SUBDOMAIN = "ivan";
const CONTACT_ID = 103014171750;
const updatedContact = {
    name: "Ivan Georgiev",
    description: "I am a Backend Software Developer",
    mobile: "359886631005",
    twitter_id: `12123113100${Math.random() * 10000}`,
    unique_external_id: `1412414101990${Math.random() * 10000}`
}

describe("Update User from Github API", () => {
    test("should return invalid credentials when the token is invalid", async () => {
        const data = await updateContactFromFreshDesk(updatedContact, VALID_SUBDOMAIN, CONTACT_ID, INVALID_KEY);
        expect(data).toHaveProperty('code', 'invalid_credentials');
    });
    test("should return invalid credentials when the subdomain is invalid", async () => {
        const data = await updateContactFromFreshDesk(updatedContact, INVALID_SUBDOMAIN, CONTACT_ID, VALID_KEY);
        expect(data).toHaveProperty('code', 'invalid_credentials');
    });
    test("should return invalid credentials when the subdomain is invalid and the token is invalid", async () => {
        const data = await updateContactFromFreshDesk(updatedContact, INVALID_SUBDOMAIN, CONTACT_ID, INVALID_KEY);
        expect(data).toHaveProperty('code', 'invalid_credentials');
    });
    test("should return contact object when the token and the subdomain are valid", async () => {
        const data = await updateContactFromFreshDesk(updatedContact, VALID_SUBDOMAIN, CONTACT_ID, VALID_KEY);
        expect(data).toHaveProperty('name', updatedContact.name);
    });
})