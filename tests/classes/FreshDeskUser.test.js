const FreshDeskUserLib = require("../../src/classes/FreshDeskUser");
const freshDeskContact1 = {
    active: true,
    description: "There is no description",
    email: "filipstoianov@abv.bg",
    job_title: "Software Developer",
    language: "Bulgarian",
    mobile: "359886631005",
    name: "Filip Stoyanov",
    first_name: "Filip",
    last_name: "Stoyanov",
    created_at: new Date("December 17, 2021 03:24:00"),
    updated_at: new Date("September 22, 2022 17:10:30")
};
const freshDeskContact2 = {
    active: true,
    description: "Description",
    email: "ivanpetrov@gmail.com",
    job_title: "Project Manager",
    language: "English",
    mobile: "359884321003",
    name: "Ivan Petrov",
    first_name: "Ivan",
    last_name: "Petrov",
    created_at: new Date("December 17, 2021 03:24:00"),
    updated_at: new Date("September 22, 2022 17:10:30")
}
const mockFreshDeskUser = {
    contacts: [
      freshDeskContact1,
      freshDeskContact2
    ]
}

describe("FreshDeskUser", () => {
    let user;
    beforeEach(() => {
        user = new FreshDeskUserLib.FreshDeskUser(mockFreshDeskUser.contacts);
    })
    test("should resolve with right contact name for existed contact", () => {
        expect(user.getName(0)).toEqual(freshDeskContact1.name);
        expect(user.getName(1)).toEqual(freshDeskContact2.name);
    });
    test("should resolve with right contact object for existed contact", () => {
        expect(user.getContact(freshDeskContact1.name)).toEqual(freshDeskContact1);
        expect(user.getContact(freshDeskContact2.name)).toEqual(freshDeskContact2);
    });
    test("should resolve with null for inexistent contact name", () => {
        expect(user.getContact("Peter Nikolov")).toEqual(null);
    });
    test("should resolve with true for existed contact", () => {
        expect(user.hasContactWithThisName(freshDeskContact1.name)).toEqual(true);
    });
    test("should resolve with false for inexistent contact", () => {
        expect(user.hasContactWithThisName("Peter Nikolov")).toEqual(false);
    });
});
