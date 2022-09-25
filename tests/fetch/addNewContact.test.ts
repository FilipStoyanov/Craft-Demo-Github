import { addNewContact } from "../../src/fetch";
const INVALID_KEY = "Xrb0b0PYA551WVzCX";
const VALID_KEY = "Xrb0b0PYA551WVzCXO";
const VALID_SUBDOMAIN = "filip";
const INVALID_SUBDOMAIN = "ivan";
const newContact = {
    email: `filip.st${Math.random() * 1000}@gmail.com`,
    name: "Filip Stoyanov",
    description: "I am a Frontend Software Developer",
    mobile: "359886631005",
    twitter_id: `12123113100${Math.random() * 10000}`,
    unique_external_id: `1412414101990${Math.random() * 10000}`
}

describe("Fetch User from Github API", () => {
    test("should return invalid credentials when key is invalid", async () => {
        const data = await addNewContact(newContact, VALID_SUBDOMAIN, INVALID_KEY);
        expect(data).toHaveProperty('code', 'invalid_credentials');
    });
    test("should return invalid credentials when subdomain is invalid", async () => {
        const data = await addNewContact(newContact, INVALID_SUBDOMAIN, VALID_KEY);
        expect(data).toHaveProperty('code', 'invalid_credentials');
    });
    test("should return invalid credentials when subdomain is invalid and key is invalid", async () => {
        const data = await addNewContact(newContact, INVALID_SUBDOMAIN, INVALID_KEY);
        expect(data).toHaveProperty('code', 'invalid_credentials');
    });
    test("should return contact object", async () => {
        const data = await addNewContact(newContact, VALID_SUBDOMAIN, VALID_KEY);
        expect(data).toHaveProperty('name', newContact.name);
    });
})