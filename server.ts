import { GithubUser } from "./src/classes/GithubUser";
import { FreshDeskUser } from "./src/classes/FreshDeskUser";
import { fetchUserFromFreshDesk, fetchUserFromGithub } from "./src/fetch";

const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
app.use(cors());


const dbConnection = require("./src/db/connection");
const insertOrUpdateGithubUser = require('./src/db/queries');

const PORT = process.env.PORT || 8080;

const server = (githubUsername: string, freshdeskSubdomain: string) => {
    app.listen(PORT, () => {
        let gitHubUser;
        let freshDeskUser;
        fetchUserFromGithub(githubUsername, process.env.GITHUB_TOKEN).then((data) => {
            if (!data.status) {
                insertOrUpdateGithubUser(data);
                gitHubUser = new GithubUser(data);
                const gitUserData = gitHubUser.getUserData();
                fetchUserFromFreshDesk(freshdeskSubdomain, process.env.FRESHDESK_TOKEN).then((data) => {
                    if (!data.status) {
                        if (data && data.length > 0 && gitUserData) {
                            freshDeskUser = new FreshDeskUser(data);
                            freshDeskUser.updateFreshDeskContact(gitUserData, freshdeskSubdomain);
                        }
                    } else {
                        console.log('Bad Freshdesk credentials');
                        process.exit(0);
                    }
                }).catch((err: Error) => {
                    throw err;
                })
            } else {
                console.log('Bad GitHub credentials');
                process.exit(0);
            }
        }).catch((err: Error) => {
            throw err;
        })
    });
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Please, enter Github login (username) : ", (githubUsername: string) => {
    rl.question("Please, enter Freshdesk subdomain : ", (freshDeskSubdomain: string) => {
        dbConnection.connectToDatabase();
        server(githubUsername, freshDeskSubdomain);
    })
})

