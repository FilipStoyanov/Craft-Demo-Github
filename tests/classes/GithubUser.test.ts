const GithubUserLib = require("../../src/classes/GithubUser");
const mockGithubUserData = {
    login: "FilipStoyanov",
    name: "Filip Stoyanov",
    location: "Bulgaria",
    twitter_username: "Filip",
    followers: 20,
    email: "filip.k.stoyanov@gmail.com",
    bio: "I am Software Developer.",
    created_at: new Date("December 17, 2021 03:24:00"),
    updated_at: new Date("September 22, 2022 17:10:30")
};
describe ("GithubUser", () => {
    let user = new GithubUserLib.GithubUser(mockGithubUserData);
    test("should return with the proper name for existed github user", () => {
        expect(user.getUsername()).toEqual("FilipStoyanov");
    });
    test("should resolve with empty string for empty user", () => {
        const emptyUser = new GithubUserLib.GithubUser();
        expect(emptyUser.getUsername()).toEqual("");
    });
    test("should resolve with proper user data for existed github user", () => {
        expect(user.getUserData()).toEqual(mockGithubUserData);
    });
    test("should resolve with an empty object for empty user", () => {
        const emptyUser = new GithubUserLib.GithubUser();
        expect(emptyUser.getUserData()).toEqual({});
    })
});
