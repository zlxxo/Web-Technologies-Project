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
baza.sequelize.sync({force: true});

// CRUD rute




// server radi na sljedecem portu
var server = app.listen(PORT);
module.exports = server;