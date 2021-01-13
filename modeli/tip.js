const Sequelize = require("sequelize");
const sequelize = require("../baza.js");

const Tip = sequelize.define('Tip', {
    naziv: Sequelize.STRING
});

module.exports = Tip;