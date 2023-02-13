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

 const Task = dbConnection.define("task", {
  page_number: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  visited: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }

});

User.hasMany(Task, {
  foreignKey: 'userId',
  as: 'tasks',
  onDelete: 'CASCADE'
});


//Create database if it doesnt exist already
 dbConnection.sync().then(() => {
    console.log('Users table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports= {User,Task};