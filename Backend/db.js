/*const mysql = require("mysql");
const dotenv = require("dotenv");

//Save sensitive information
dotenv.config({ path: './.env'});

//Start database...you can edit to connect to your own database
// If you get error run "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';" in workbench
//Also use the port 3306  


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
})

module.exports = db */