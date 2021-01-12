const Sequelize = require("sequelize");
const sequelize = require("../baza.js");
 
module.exports = function (sequelize, DataTypes) {
    const Predmet = sequelize.define('Imenik', {
       naziv: Sequelize.STRING
   });
   return Predmet;
}
