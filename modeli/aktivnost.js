const Sequelize = require("sequelize");
const sequelize = require("../baza.js");
 
const Aktivnost = sequelize.define('Aktivnost', {
    naziv: Sequelize.STRING,
   pocetak: Sequelize.FLOAT,
   kraj: Sequelize.FLOAT
});

module.exports = Aktivnost;