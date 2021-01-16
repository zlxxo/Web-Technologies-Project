const baza = require('./baza.js');

const inicijalizacija = function() {
    // kreiranje baze
    //baza.sequelize.sync({force: true});
    baza.sequelize.sync().then(() => {
        console.log("radi");
    });
}

const inicijalizacijaBaze = {};
inicijalizacijaBaze.inicijalizacija = inicijalizacija;

module.exports = inicijalizacijaBaze;