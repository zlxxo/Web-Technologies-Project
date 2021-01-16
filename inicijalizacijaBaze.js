const baza = require('./baza.js');
const dan = require('./modeli/dan.js');
const predmet = require('./modeli/predmet.js');

const inicijalizacija = function() {
    // kreiranje baze
    baza.sequelize.sync({force: true}).then(() => {
        punjenjeBaze().then(() => {
            console.log("Napunjena baza!");
        });
    });
}

function punjenjeBaze() {
    let predmeti = [];
    let dani = [];
    let tipovi = [];
    let grupe = [];
    return new Promise(function(resolve,reject){
        const ponedjeljak = baza.Dan.create({naziv: "Ponedjeljak"});
        dani.push(ponedjeljak);
        const utorak = baza.Dan.create({naziv: "Utorak"});
        dani.push(utorak);
        const srijeda = baza.Dan.create({naziv: "Srijeda"});
        dani.push(srijeda);
        const cetvrtak = baza.Dan.create({naziv: "Cetvrtak"});
        dani.push(cetvrtak);
        const petak = baza.Dan.create({naziv: "Petak"});
        dani.push(petak);
    
        const predavanje = baza.Tip.create({naziv: "Predavanje"});
        tipovi.push(predavanje);
        const vjezbe = baza.Tip.create({naziv: "Vjezbe"});
        tipovi.push(vjezbe);
        const tutorijal = baza.Tip.create({naziv: "Tutorijal"});
        tipovi.push(tutorijal);
    
        const wt = baza.Predmet.create({naziv: "WT"});
        predmeti.push(wt);
        const rma = baza.Predmet.create({naziv: "RMA"});
        predmeti.push(rma);
        const rpr = baza.Predmet.create({naziv: "RPR"});
        predmeti.push(rpr);
    
        Promise.all(predmeti).then((pr) => {
            //console.log(pr);
            var predmet1 = pr.filter((p) => {
                return p.naziv == "WT";
            })[0];
            //console.log(predmet);
            var predmet2 = pr.filter((p) => {
                return p.naziv == "RMA";
            })[0];
    
            const grupa1 = baza.Grupa.create({
                naziv: "Grupa 1 - WT",
                PredmetId: predmet1.id
            }).then((p) => {
                p.setPredmeti([predmet1]).then(() => {
                    return new Promise(function(resolve,reject){resolve(p);});
                });
            });
            grupe.push(grupa1);

            const grupa2 = baza.Grupa.create({
                naziv: "Grupa 2 - WT",
                PredmetId: predmet1.id
            }).then((p) => {
                p.setPredmeti([predmet1]).then(() => {
                    return new Promise(function(resolve,reject){resolve(p);});
                });
            });
            grupe.push(grupa2);

            const grupa3 = baza.Grupa.create({
                naziv: "Grupa 1 - RMA",
                PredmetId: predmet2.id
            }).then((p) => {
                p.setPredmeti([predmet2]).then(() => {
                    return new Promise(function(resolve,reject){resolve(p);});
                });
            });
            grupe.push(grupa3);
        });
    });
}

const inicijalizacijaBaze = {};
inicijalizacijaBaze.inicijalizacija = inicijalizacija;

module.exports = inicijalizacijaBaze;