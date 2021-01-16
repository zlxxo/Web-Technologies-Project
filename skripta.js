const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const PORT = 3000;

// pristup statickim fajlovima preko servera
app.use(express.static(__dirname + '/'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// rute
app.get('/v1/predmeti', function (req, res) {
    fs.readFile('resursi/predmeti.txt', function(err, buffer) {
        if(err) throw err;
        let predmeti = [];
        let procitano = buffer.toString("utf-8");
        let arr = procitano.split("\n");
        arr.forEach(element => {
            element = element.replace("\r", "");
            if(element != "") {
                //console.log(element);
                predmeti.push({naziv:element});
            }
        });
        res.json(predmeti);
        //console.log(predmeti);
    });
});

app.get('/v1/aktivnosti', function (req, res) {
    fs.readFile('resursi/aktivnosti.txt', function(err, buffer) {
        if(err) throw err;
        let aktivnosti = [];
        let procitano = buffer.toString("utf-8");
        let arr = procitano.split("\n");
        let greska = 0;
        arr.forEach(element => {
            if(element != "") {
                let linija = element.split(",");
                let naziv = linija[0];
                let tip = linija[1];
                let pocetak = Number.parseFloat(linija[2]);
                let kraj = Number.parseFloat(linija[3]);
                let dan = linija[4].replace("\r", "");
                aktivnosti.push({naziv:naziv,tip:tip,pocetak:pocetak,kraj:kraj,dan:dan});
            }
        });
        res.json(aktivnosti);
        //console.log(aktivnosti);
    });
});

app.get('/v1/predmet/:naziv/aktivnost/', function (req, res) {
    let naziv = req.params.naziv;
    fs.readFile('resursi/aktivnosti.txt', function(err, buffer) {
        if(err) throw err;
        let aktivnosti_predmeta = [];
        let procitano = buffer.toString("utf-8");
        let arr = procitano.split("\n");
        arr.forEach(element => {
            if(element != "") {
                let linija = element.split(",");
                let naziv1 = linija[0];
                let tip = linija[1];
                let pocetak = Number.parseFloat(linija[2]);
                let kraj = Number.parseFloat(linija[3]);
                let dan = linija[4].replace("\r", "");
                if(naziv == naziv1) {
                    aktivnosti_predmeta.push({naziv:naziv,tip:tip,pocetak:pocetak,kraj:kraj,dan:dan});
                }
            }
        });
        res.json(aktivnosti_predmeta);
    });
});

app.post('/v1/predmet', function (req, res) {
    let tijelo = req.body;
    let predmet = tijelo["naziv"];
    //console.log('Got body:', tijelo);
    //console.log("zahtjev :", req);
    let novaLinija = predmet + "\n";
    fs.readFile('resursi/predmeti.txt', function(err, buffer) {
        if(err) throw err;
        let procitano = buffer.toString("utf-8");
        let arr = procitano.split("\n");
        let postoji = 0;
        arr.forEach(element => {
            element = element.replace("\r", "");
            if(element == predmet) {
                postoji++;
            }
        });
        if(postoji > 0) {
            res.json({message:"Naziv predmeta postoji!"});
            return;
        }
        fs.appendFile('resursi/predmeti.txt', novaLinija, function(err) {
            if(err) throw err;
            res.json({message:"Uspješno dodan predmet!"});
        });
    });
});

function presjek(Apocetak, Akraj, Bpocetak, Bkraj) {
    let pocetak = (Apocetak > Bpocetak) ? Apocetak : Bpocetak;
    let kraj = (Akraj < Bkraj) ? Akraj : Bkraj;
    if(pocetak >= kraj) return false;
    return true;
}

app.post('/v1/aktivnost', function (req, res) {
    let tijelo = req.body;
    let naziv = tijelo["naziv"];
    let tip = tijelo["tip"];
    let pocetak = Number.parseFloat(tijelo["pocetak"]);
    let kraj = Number.parseFloat(tijelo["kraj"]);
    let dan = tijelo["dan"];
    //console.log('Got body:', tijelo);
    //console.log("zahtjev :", req);
    if(pocetak < 8 || kraj > 20 || pocetak >= kraj ||
        !(Number.isInteger(pocetak) || Number.isInteger(pocetak*2)) ||
        !(Number.isInteger(kraj) || Number.isInteger(kraj*2))) {
        res.json({message:"Aktivnost nije validna!"});
        return;
    }
    //console.log(presjek(12, 15, pocetak, kraj));
    let novaLinija = naziv + "," + tip + "," + pocetak + "," + kraj + "," + dan + "\n";

    fs.readFile('resursi/aktivnosti.txt', function(err, buffer) {
        if(err) throw err;
        let procitano = buffer.toString("utf-8");
        let arr = procitano.split("\n");
        let greska = 0;
        // provjera da li se poklapa vrijeme aktivnosti sa nekom koja je vec upisana
        arr.forEach(element => {
            //console.log("linija: " + element);
            if(element == null || element == "") return;
            let linija = element.split(",");
            let naziv1 = linija[0];
            let tip1 = linija[1];
            let pocetak1 = Number.parseFloat(linija[2]);
            let kraj1 = Number.parseFloat(linija[3]);
            let dan1 = linija[4].replace("\r", "");
            if(dan == dan1 && presjek(pocetak, kraj, pocetak1, kraj1)) {
                greska++;
            }
        });
        if(greska > 0) {
            res.json({message:"Aktivnost nije validna!"});
            return;
        }

        fs.appendFile('resursi/aktivnosti.txt', novaLinija, function(err) {
            if(err) throw err;
            res.json({message:"Uspješno dodana aktivnost!"});
        }); 
    });
});

// funkcija za brisanje linija
const izbrisiLinije = (data, linije = []) => {
    return data
        .split('\n')
        .filter((val, idx) => linije.indexOf(idx) === -1)
        .join('\n');
}

app.delete('/v1/aktivnost/:naziv', function (req, res) {
    let naziv = req.params.naziv;
    //console.log(req.params);
    fs.readFile('resursi/aktivnosti.txt', function(err, buffer) {
        if(err) throw err;
        let procitano = buffer.toString("utf-8");
        let arr = procitano.split("\n");
        // trazenje aktivnosti sa nazivom
        let zaIzbrisati = [];
        for(let i = 0; i < arr.length; i++) {
            let element = arr[i];
            //console.log("linija: " + element);
            if(element != "") {
                let linija = element.split(",");
                let naziv1 = linija[0];
                if(naziv == naziv1) {
                    zaIzbrisati.push(i);
                }
            }
        }
        if(zaIzbrisati.length > 0) {
            fs.writeFile('resursi/aktivnosti.txt', izbrisiLinije(procitano, zaIzbrisati), 'utf8', function(err) {
                if (err) {
                    res.json({message:"Greška - aktivnost nije obrisana!"});
                    throw err;
                }
                res.json({message:"Uspješno obrisana aktivnost!"});
            });
        } else {
            res.json({message:"Greška - aktivnost nije obrisana!"});
        } 
    });
});

app.delete('/v1/predmet/:naziv', function (req, res) {
    let naziv = req.params.naziv;
    //console.log(req.params);
    fs.readFile('resursi/predmeti.txt', function(err, buffer) {
        if(err) throw err;
        let procitano = buffer.toString("utf-8");
        let arr = procitano.split("\n");
        // trazenje aktivnosti sa nazivom
        let zaIzbrisati = [];
        for(let i = 0; i < arr.length; i++) {
            let element = arr[i];
            //console.log("linija: " + element);
            if(element != "") {
                element = element.replace("\r", "");
                if(naziv == element) {
                    zaIzbrisati.push(i);
                    break;
                }
            }
        }
        if(zaIzbrisati.length > 0) {
            fs.writeFile('resursi/predmeti.txt', izbrisiLinije(procitano, zaIzbrisati), 'utf8', function(err) {
                if (err) {
                    res.json({message:"Greška - predmet nije obrisan!"});
                    throw err;
                }
                res.json({message:"Uspješno obrisan predmet!"});
            });
        } else {
            res.json({message:"Greška - predmet nije obrisan!"});
        } 
    });
});

app.delete('/v1/all', function (req, res) {
    fs.writeFile('resursi/predmeti.txt', "", 'utf8', function(err) {
        if (err) {
            res.json({message:"Greška - sadržaj datoteka nije moguće obrisati!"});
            throw err;
        }
        fs.writeFile('resursi/aktivnosti.txt', "", 'utf8', function(err) {
            if (err) {
                res.json({message:"Greška - sadržaj datoteka nije moguće obrisati!"});
                throw err;
            }
            res.json({message:"Uspješno obrisan sadržaj datoteka!"});
        });
    });
});

// veza sa bazom
const baza = require('./baza.js');

// kreiranje baze
//baza.sequelize.sync({force: true});
baza.sequelize.sync();

// rute za CRUD
app.get('/v2/aktivnost', function (req, res) {
    baza.Aktivnost.findAll().then((aktivnosti) => {
        res.json(aktivnosti);
    });
});

app.get('/v2/dan', function (req, res) {
    baza.Dan.findAll().then((dani) => {
        res.json(dani);
    });
});

app.get('/v2/grupa', function (req, res) {
    baza.Grupa.findAll().then((grupe) => {
        res.json(grupe);
    });
});

app.get('/v2/predmet', function (req, res) {
    baza.Predmet.findAll().then((predmeti) => {
        res.json(predmeti);
    });
});

app.get('/v2/student', function (req, res) {
    baza.Student.findAll().then((studenti) => {
        res.json(studenti);
    });
});

app.get('/v2/tip', function (req, res) {
    baza.Tip.findAll().then((tipovi) => {
        res.json(tipovi);
    });
});

app.post('/v2/aktivnost/:id', function (req, res) {
    const aktivnostId = req.params.id;
    const naziv = req.body.naziv;
    const pocetak = req.body.pocetak;
    const kraj = req.body.kraj;
    const tip = req.body.tipId;
    const dan = req.body.danId;
    const grupa = req.body.grupaId;
    const predmet = req.body.predmetId;
    baza.Aktivnost.findOne({
        where: {
            id: aktivnostId
        }
    }).then((rezultat) => {
        if(rezultat == null) {
            const aktivnost = {
                id: aktivnostId,
                naziv: naziv,
                kraj: kraj,
                pocetak: pocetak,
                TipId: tip,
                DanId: dan,
                PredmetId: predmet
            };
            if(grupa != null) {
                aktivnost.GrupaId = grupa;
            }
            baza.Aktivnost.create(aktivnost).then((rez) => {
                res.send(rez);
            });
        } else {
            res.send("Aktivnost već upisana!");
        }
    });
});

app.post('/v2/dan/:id', function (req, res) {
    const danId = req.params.id;
    const naziv = req.body.naziv;
    baza.Dan.findOne({
        where: {
            id: danId
        }
    }).then((rezultat) => {
        if(rezultat == null) {
            const dan = {
                id: danId,
                naziv: naziv
            };
            baza.Dan.create(dan).then((rez) => {
                res.send(rez);
            });
        } else {
            res.send("Predmet već upisan!");
        }
    });
});

app.post('/v2/grupa/:id', function (req, res) {
    const grupaId = req.params.id;
    const naziv = req.body.naziv;
    const predmetId = req.body.predmetId;
    baza.Grupa.findOne({
        where: {
            id: grupaId
        }
    }).then((rezultat) => {
        if(rezultat == null) {
            const grupa = {
                id: grupaId,
                naziv: naziv,
                PredmetId: predmetId
            };
            baza.Grupa.create(grupa).then((rez) => {
                res.send(rez);
            });
        } else {
            res.send("Grupa već upisana!");
        }
    });
});

app.post('/v2/predmet/:id', function (req, res) {
    const predmetId = req.params.id;
    const naziv = req.body.naziv;
    baza.Predmet.findOne({
        where: {
            id: predmetId
        }
    }).then((rezultat) => {
        if(rezultat == null) {
            const predmet = {
                id: predmetId,
                naziv: naziv
            };
            baza.Predmet.create(predmet).then((rez) => {
                res.send(rez);
            });
        } else {
            res.send("Predmet već upisan!");
        }
    });
});

app.post('/v2/student/:id', function (req, res) {
    const studentId = req.params.id;
    const ime = req.body.ime;
    const index = req.body.index;
    baza.Student.findOne({
        where: {
            id: studentId
        }
    }).then((rezultat) => {
        if(rezultat == null) {
            const student = {
                id: studentId,
                ime: ime,
                index: index
            };
            baza.Student.create(student).then((rez) => {
                res.send(rez);
            });
        } else {
            res.send(rezultat);
            //res.send("Student već upisan!");
        }
    });
});

app.post('/v2/student', function (req, res) {
    const ime = req.body.ime;
    const index = req.body.index;
    const grupaId = req.body.grupaId;
    console.log(grupaId);
    const grupe = req.body.grupe;
    console.log(grupe);
    baza.Student.findOne({
        where: {
            index: index
        }
    }).then((rezultat) => {
        if(rezultat == null) {
            const student = {
                ime: ime,
                index: index
            };
            baza.Student.create(student).then((rez) => {
                let odgovor = {
                    poruka: "Kreiran student novi student!",
                    student: rez
                }
                res.json(odgovor);
            });
        } else {
            if(rezultat.ime == ime) {
                let odgovor = {
                    poruka: "Student je već upisan!",
                    student: rezultat
                }
                res.json(odgovor);
            } else {
                let odgovor = {
                    poruka: "Student " + ime + " nije kreiran jer postoji student " +
                        rezultat.ime + " sa istim indexom " + index + "!",
                    student: rezultat
                }
                res.json(odgovor);
            }
        }
    });
});

app.post('/v2/tip/:id', function (req, res) {
    const tipId = req.params.id;
    const naziv = req.body.naziv;
    baza.Tip.findOne({
        where: {
            id: tipId
        }
    }).then((rezultat) => {
        if(rezultat == null) {
            const tip = {
                id: tipId,
                naziv: naziv
            };
            baza.Tip.create(tip).then((rez) => {
                res.send(rez);
            });
        } else {
            res.send("Tip već upisan!");
        }
    });
});

app.put('/v2/aktivnost/:id', function (req, res) {
    const aktivnostId = req.params.id;
    const naziv = req.body.naziv;
    const pocetak = req.body.pocetak;
    const kraj = req.body.kraj;
    const tip = req.body.tipId;
    const dan = req.body.danId;
    const grupa = req.body.grupaId;
    const predmet = req.body.predmetId;
    const aktivnost = {
        id: aktivnostId,
        naziv: naziv,
        kraj: kraj,
        pocetak: pocetak,
        TipId: tip,
        DanId: dan,
        PredmetId: predmet
    };
    if(grupa != null) {
        aktivnost.GrupaId = grupa;
    }
    baza.Aktivnost.update(aktivnost, {
        where: {
            id: aktivnostId
        }
    }).then((rez) => {
        if(rez == 0) {
            res.send("Nepostojeća aktivnost!");
        } else {
            res.send("Uspješno ažurirana aktivnost!");
        }
    });
});

app.put('/v2/dan/:id', function (req, res) {
    const danId = req.params.id;
    const naziv = req.body.naziv;
    const dan = {
        naziv: naziv
    };
    baza.Dan.update(dan, {
        where: {
            id: danId
        }
    }).then((rez) => {
        if(rez == 0) {
            res.send("Nepostojeći dan!");
        } else {
            res.send("Uspješno ažuriran dan!")
        }
    });
});

app.put('/v2/grupa/:id', function (req, res) {
    const grupaId = req.params.id;
    const naziv = req.body.naziv;
    const predmetId = req.body.predmetId;
    const grupa = {
        naziv: naziv,
        PredmetId: predmetId
    };
    baza.Grupa.update(grupa, {
        where: {
            id: grupaId
        }
    }).then((rez) => {
        if(rez == 0) {
            res.send("Nepostojeća grupa!");
        } else {
            res.send("Uspješno ažurirana grupa!");
        }
    });
});

app.put('/v2/predmet/:id', function (req, res) {
    const predmetId = req.params.id;
    const naziv = req.body.naziv;
    const predmet = {
        naziv: naziv
    };
    baza.Predmet.update(predmet, {
        where: {
            id: predmetId
        }
    }).then((rez) => {
        if(rez == 0) {
            res.send("Nepostojeći predmet!");
        } else {
            res.send("Uspješno ažuriran predmet!");
        }
    });
});

app.put('/v2/student/:id', function (req, res) {
    const studentId = req.params.id;
    const ime = req.body.ime;
    const index = req.body.index;
    const student = {
        ime: ime,
        index: index
    };
    baza.Student.update(student, {
        where: {
            id: studentId
        }
    }).then((rez) => {
        if(rez == 0) {
            res.send("Nepostojeći student!");
        } else {
            res.send("Uspješno ažuriran student!");
        }
    });
});

app.put('/v2/tip/:id', function (req, res) {
    const tipId = req.params.id;
    const naziv = req.body.naziv;
    const tip = {
        naziv: naziv
    };
    baza.Tip.update(tip, {
        where: {
            id: tipId
        }
    }).then((rez) => {
        if(rez == 0) {
            res.send("Nepostojeći tip!");
        } else {
            res.send("Uspješno ažuriran tip!");
        }
    });
});

app.delete('/v2/aktivnost/:id', function (req, res) {
    const aktivnost = req.params.id;
    baza.Aktivnost.destroy({
        where: {
            id: aktivnost
        }
    }).then((broj) => {
        res.send("Broj obrisanih aktivnosti je " + broj);
    });
});

app.delete('/v2/dan/:id', function (req, res) {
    const dan = req.params.id;
    baza.Dan.destroy({
        where: {
            id: dan
        }
    }).then((broj) => {
        res.send("Broj obrisanih dana je " + broj);
    });
});

app.delete('/v2/grupa/:id', function (req, res) {
    const grupa = req.params.id;
    baza.Grupa.destroy({
        where: {
            id: grupa
        }
    }).then((broj) => {
        res.send("Broj obrisanih grupa je " + broj);
    });
});

app.delete('/v2/predmet/:id', function (req, res) {
    const predmet = req.params.id;
    baza.Predmet.destroy({
        where: {
            id: predmet
        }
    }).then((broj) => {
        res.send("Broj obrisanih predmeta je " + broj);
    });
});

app.delete('/v2/student/:id', function (req, res) {
    const student = req.params.id;
    baza.Student.destroy({
        where: {
            id: student
        }
    }).then((broj) => {
        res.send("Broj obrisanih studenata je " + broj);
    });
});

app.delete('/v2/tip/:id', function (req, res) {
    const tip = req.params.id;
    baza.Tip.destroy({
        where: {
            id: tip
        }
    }).then((broj) => {
        res.send("Broj obrisanih tipova je " + broj);
    });
});

// server radi na sljedecem portu
var server = app.listen(PORT);
module.exports = server;