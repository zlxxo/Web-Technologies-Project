const baza = require('./baza.js');

const inicijalizacija = function() {
    // kreiranje baze
    baza.sequelize.sync({force: true}).then(() => {
        punjenjeBaze();
    });
}

function punjenjeBaze() {
    const ponedjeljak = baza.Dan.create({naziv: "Ponedjeljak"});
    const utorak = baza.Dan.create({naziv: "Utorak"});
    const srijeda = baza.Dan.create({naziv: "Srijeda"});
    const etvrtak = baza.Dan.create({naziv: "Cetvrtak"});
    const petak = baza.Dan.create({naziv: "Petak"});

    const predavanje = baza.Tip.create({naziv: "Predavanje"});
    const vjezbe = baza.Tip.create({naziv: "Vjezbe"});
    const tutorijal = baza.Tip.create({naziv: "Tutorijal"});

    const wt = baza.Predmet.create({naziv: "WT"});
    const rma = baza.Predmet.create({naziv: "RMA"});
    const rpr = baza.Predmet.create({naziv: "RPR"});
}

const inicijalizacijaBaze = {};
inicijalizacijaBaze.inicijalizacija = inicijalizacija;

module.exports = inicijalizacijaBaze;