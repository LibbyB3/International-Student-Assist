const Sequelize = require("sequelize");
const mysql = require("mysql");
const dotenv = require("dotenv"); 
const path = require('path');


//Save sensitive information
dotenv.config({ path: './.env'});

//Connection parameters
const dbConnection = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      dialect: 'mysql'
    }
  );

module.exports = {
	database : dbConnection
};