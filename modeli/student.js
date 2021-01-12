const Sequelize = require("sequelize");
const sequelize = require("../baza.js");
 
module.exports = function (sequelize, DataTypes) {
    const Student = sequelize.define('Student', {
       naziv: Sequelize.STRING,
       index: Sequelize.STRING
   });
   return Student;
}