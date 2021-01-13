const Sequelize = require("sequelize");
const sequelize = require("../baza.js");

const Dan = sequelize.define('Dan', {
    naziv: Sequelize.STRING
});

module.exports = Dan;