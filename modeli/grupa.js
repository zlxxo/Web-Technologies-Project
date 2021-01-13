const Sequelize = require("sequelize");
const sequelize = require("../baza.js");

const Grupa = sequelize.define('Grupa', {
    naziv: Sequelize.STRING
});

module.exports = Grupa;