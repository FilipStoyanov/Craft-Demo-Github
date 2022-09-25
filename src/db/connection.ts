const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const connectToDatabase = () => {
    connection.connect(function (err: Error) {
        if (err) {
            throw err
        } else {
            console.log('Connected to the database');
        }
    });
}

module.exports = {
    connection,
    connectToDatabase,
};