const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Grupa = sequelize.define('Grupa', {
        naziv: Sequelize.STRING
    });
    return Grupa;
}