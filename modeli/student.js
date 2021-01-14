const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Student = sequelize.define('Student', {
        ime: Sequelize.STRING,
        index: Sequelize.STRING
    });
    return Student;
}