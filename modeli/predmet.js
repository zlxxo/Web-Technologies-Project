const Sequelize = require("sequelize");
const sequelize = require("../baza.js");

const Predmet = sequelize.define('Predmet', {
    naziv: Sequelize.STRING
});

module.exports = Predmet;