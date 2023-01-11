const {Sequelize, DataTypes} = require("sequelize");
const dbConnection = require('../config/dbConnection').database;

//Optimize later
//Create User model
const User = dbConnection.define("users", {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
    }
 });


//Create database if it doesnt exist already
 dbConnection.sync().then(() => {
    console.log('Users table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports= User;