const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Aktivnost = sequelize.define('Aktivnost', {
        naziv: Sequelize.STRING,
        pocetak: Sequelize.FLOAT,
        kraj: Sequelize.FLOAT
    });
    return Aktivnost;
}