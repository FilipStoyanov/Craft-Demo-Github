import { GithubUser } from "./src/classes/GithubUser";
import { FreshDeskUser } from "./src/classes/FreshDeskUser";
import { fetchUserFromFreshDesk, fetchUserFromGithub } from "./src/fetch";

const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

const getCommandLineArgs = (): Array<string> => {
    let githubUsername: string = '';
    let freshDeskSubdomain: string = '';
    process.argv.forEach(function (val, index) {
        if (index === 2) {
            githubUsername = val;
        }
        if (index === 3) {
            freshDeskSubdomain = val;
        }
    });
    return [githubUsername, freshDeskSubdomain];
}

app.listen(PORT, () => {
    let gitHubUser;
    let freshDeskUser;
    const commandArgs: Array<string> = getCommandLineArgs();
    fetchUserFromGithub(commandArgs[0], process.env.GITHUB_TOKEN).then((data) => {
        gitHubUser = new GithubUser(data);
        const gitUserData = gitHubUser.getUserData();
        fetchUserFromFreshDesk(commandArgs[1], process.env.FRESHDESK_TOKEN).then((data) => {
            freshDeskUser = new FreshDeskUser(data);
            freshDeskUser.updateFreshDeskContact(gitUserData,commandArgs[1]);
        }).catch((err) => {
            console.log('Invalid subdomain');
        })
    }).catch((err) => {
        console.log(err);
    })
});