const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require('path');
const { appendFile } = require("fs");
const { handlebars } = require("hbs");
const hbs = require('express-handlebars');


//Save sensitive information
dotenv.config({ path: './.env'});

//server
const app = express();

const publicDirectory =path.join(__dirname,"public");

//So we can grab data from any form
app.use(express.urlencoded({ extended: false}));
//Make sure values come in as Json Objects
app.use(express.json());

// To tell nodejs where bootstrap file is
app.use(express.static(publicDirectory));

// To use boostrap both offline and online
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));



// set the view engine to ejs
// use res.render to load up an ejs view file
app.set('view engine', 'hbs');

//Layouts for the frontend using main.html
app.engine( 'hbs', hbs.engine( {
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: __dirname + '/views/layouts/'
}));


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

//Database Connection
db.connect((error)=> {
    if(error){
        console.log(error)
    }else{
        console.log("Database Connnected")
    }
})

//Define Routes here
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

app.listen(5000, () => {
    console.log("server started on port 5000")
})