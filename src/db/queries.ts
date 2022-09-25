import { GitUser } from "../interfaces";
const dbConnection = require('./connection');

const insertOrUpdateGithubUser = (data: GitUser) => {
    let date: Date = new Date();
    if (data && data.created_at) {
        date = new Date(data.created_at);
    }
    if (data && data.created_at && data.login && date) {
        dbConnection.connection.query(
            'INSERT INTO users (LOGIN, NAME, CREATED_AT) VALUES (?,?,?) ON DUPLICATE KEY UPDATE LOGIN = VALUES(LOGIN), NAME = VALUES(NAME), CREATED_AT = VALUES(CREATED_AT)',
            [data.login, data.name, date], (error: Error) => {
                if (error) {
                    console.log('Something went wrong')
                    process.exit(0);
                }
            }
        )
    }
}

module.exports = insertOrUpdateGithubUser;