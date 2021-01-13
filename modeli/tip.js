const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Tip = sequelize.define('Tip', {
        naziv: Sequelize.STRING
    });
    return Tip;
}