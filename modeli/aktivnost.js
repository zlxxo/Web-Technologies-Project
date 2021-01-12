const Sequelize = require("sequelize");
const sequelize = require("../baza.js");
 
module.exports = function (sequelize, DataTypes) {
    const Aktivnost = sequelize.define('Aktivnost', {
       naziv: Sequelize.STRING,
       pocetak: Sequelize.FLOAT,
       kraj: Sequelize.FLOAT
   });
   return Aktivnost;
}