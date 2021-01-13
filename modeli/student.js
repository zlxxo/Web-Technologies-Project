const Sequelize = require("sequelize");
const sequelize = require("../baza.js");

const Student = sequelize.define('Student', {
    naziv: Sequelize.STRING,
    index: Sequelize.STRING
});

module.exports = Student;