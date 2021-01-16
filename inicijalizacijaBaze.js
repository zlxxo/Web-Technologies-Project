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
    let studenti = [];
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
        Promise.all(dani).then((p) => {}).catch((p) => {});
    
        const predavanje = baza.Tip.create({naziv: "Predavanje"});
        tipovi.push(predavanje);
        const vjezbe = baza.Tip.create({naziv: "Vjezbe"});
        tipovi.push(vjezbe);
        const tutorijal = baza.Tip.create({naziv: "Tutorijal"});
        tipovi.push(tutorijal);
        Promise.all(tipovi).then((p) => {}).catch((p) => {});
    
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
                p.setGrupePredmeta([predmet1]).then(() => {
                    return new Promise(function(resolve,reject){resolve(p);});
                });
            });
            grupe.push(grupa1);

            const grupa2 = baza.Grupa.create({
                naziv: "Grupa 2 - WT",
                PredmetId: predmet1.id
            }).then((p) => {
                p.setGrupePredmeta([predmet1]).then(() => {
                    return new Promise(function(resolve,reject){resolve(p);});
                });
            });
            grupe.push(grupa2);

            const grupa3 = baza.Grupa.create({
                naziv: "Grupa 1 - RMA",
                PredmetId: predmet2.id
            }).then((p) => {
                p.setGrupePredmeta([predmet2]).then(() => {
                    return new Promise(function(resolve,reject){resolve(p);});
                });
            });
            grupe.push(grupa3);

            const grupa4 = baza.Grupa.create({
                naziv: "Grupa 2 - RMA",
                PredmetId: predmet2.id
            }).then((p) => {
                p.setGrupePredmeta([predmet2]).then(() => {
                    return new Promise(function(resolve,reject){resolve(p);});
                });
            });
            grupe.push(grupa4);
        });

        Promise.all(grupe).then((gr) =>{
            
            var gr1 = gr.filter((p) => {
                return p.naziv == "Grupa 1 - WT";
            })[0];

            var gr2 = gr.filter((p) => {
                return p.naziv == "Grupa 2 - WT";
            })[0];

            var gr3 = gr.filter((p) => {
                return p.naziv == "Grupa 1 - RMA";
            })[0];

            var gr4 = gr.filter((p) => {
                return p.naziv == "Grupa 2 - RMA";
            })[0];

            const neko = baza.Student.create({
                ime: "Neko Nekic",
                index: 11111
            }).then((p) => {
                p.setGrupe([gr1, gr3]).then(() => {
                    return new Promise(function(resolve,reject){resolve(p);});
                });
            });
            studenti.push(neko);
            

            const huso = baza.Student.create({
                ime: "Huso Husic",
                index: 11112
            }).then((p) => {
                p.setGrupe([gr2, gr3]).then(() => {
                    return new Promise(function(resolve,reject){resolve(p);});
                });
            });
            studenti.push(huso);

            const maja = baza.Student.create({
                ime: "Maja Majic",
                index: 11113
            }).then((p) => {
                p.setGrupe([gr2, gr4]).then(() => {
                    return new Promise(function(resolve,reject){resolve(p);});
                });
            });
            studenti.push(maja);

            const hana = baza.Student.create({
                ime: "Hana Hanic",
                index: 11114
            }).then((p) => {
                p.setGrupe([gr1, gr4]).then(() => {
                    return new Promise(function(resolve,reject){resolve(p);});
                });
            });
            studenti.push(hana);

            Promise.all(studenti).then((p) => {}).catch((p) => {});
        });
    });
}

const inicijalizacijaBaze = {};
inicijalizacijaBaze.inicijalizacija = inicijalizacija;

module.exports = inicijalizacijaBaze;