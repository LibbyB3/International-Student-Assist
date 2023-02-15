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
  task1: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  task2: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  task3: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  task4: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  task5: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  task6: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  task7: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  task8: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  task9: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  task10: {
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