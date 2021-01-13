const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Predmet = sequelize.define('Predmet', {
        naziv: Sequelize.STRING
    });
    return Predmet;
}