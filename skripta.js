const express = require('express');
var app = express();
const bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
const PORT = 3000;

// pristup statickim fajlovima preko servera
app.use(express.static(__dirname + '/'));

// za čitanje tijela zahtjeva
app.use(bodyParser.urlencoded({ extended: true }));

// rute
/*var predmeti = [{naziv:"WT"},
                {naziv:"RMA"},
                {naziv:"RG"},
                {naziv:"DM"},
                {naziv:"OOI"},
                {naziv:"OIS"},
                {naziv:"VVS"}];*/
app.get('/predmeti', function (req, res) {
    fs.readFile('resursi/predmeti.txt', function(err, buffer) {
        if(err) throw err;
        var predmeti = [];
        var procitano = buffer.toString("utf-8");
        var arr = procitano.split("\n");
        arr.forEach(element => {
            element = element.replace("\r", "");
            if(element != "") {
                //console.log(element);
                predmeti.push({naziv:element});
            }
        });
        res.json(predmeti);
    });
});

/*var aktivnosti = [{naziv:"WT",tip:"predavanje",pocetak:9,kraj:12,dan:"Ponedjeljak"},
                  {naziv:"WT",tip:"vježbe",pocetak:12,kraj:14,dan:"Ponedjeljak"},
                  {naziv:"RMA",tip:"predavanje",pocetak:14,kraj:17,dan:"Ponedjeljak"},
                  {naziv:"RMA",tip:"vježbe",pocetak:12,kraj:14,dan:"Utorak"},
                  {naziv:"DM",tip:"tutorijal",pocetak:14,kraj:16,dan:"Utorak"},
                  {naziv:"DM",tip:"predavanje",pocetak:16,kraj:18,dan:"Utorak"},
                  {naziv:"OI",tip:"predavanje",pocetak:12,kraj: 15,dan:"Srijeda"}];*/

app.get('/aktivnosti', function (req, res) {
    fs.readFile('resursi/aktivnosti.txt', function(err, buffer) {
        if(err) throw err;
        var aktivnosti = [];
        var procitano = buffer.toString("utf-8");
        var arr = procitano.split("\n");
        let greska = 0;
        arr.forEach(element => {
            if(element != "") {
                var linija = element.split(",");
                let naziv = linija[0];
                let tip = linija[1];
                let pocetak = Number.parseFloat(linija[2]);
                let kraj = Number.parseFloat(linija[3]);
                let dan = linija[4].replace("\r", "");
                aktivnosti.push({naziv:naziv,tip:tip,pocetak:pocetak,kraj:kraj,dan:dan});
            }
        });
        res.json(aktivnosti);
    });
});

app.get('/predmet/:naziv/aktivnost/', function (req, res) {
    let naziv = req.params.naziv;
    fs.readFile('resursi/aktivnosti.txt', function(err, buffer) {
        if(err) throw err;
        let aktivnosti_predmeta = [];
        var procitano = buffer.toString("utf-8");
        var arr = procitano.split("\n");
        arr.forEach(element => {
            if(element != "") {
                var linija = element.split(",");
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

app.post('/predmet', function (req, res) {
    let tijelo = req.body;
    let predmet = tijelo["naziv"];
    //console.log('Got body:', tijelo);
    let novaLinija = predmet + "\n";
    fs.readFile('resursi/predmeti.txt', function(err, buffer) {
        if(err) throw err;
        var procitano = buffer.toString("utf-8");
        var arr = procitano.split("\n");
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

app.post('/aktivnost', function (req, res) {
    let tijelo = req.body;
    let naziv = tijelo["naziv"];
    let tip = tijelo["tip"];
    let pocetak = Number.parseFloat(tijelo["pocetak"]);
    let kraj = Number.parseFloat(tijelo["kraj"]);
    let dan = tijelo["dan"];
    //console.log('Got body:', tijelo);
    if(pocetak < 0 || kraj > 24 || pocetak >= kraj ||
        !(Number.isInteger(pocetak) || Number.isInteger(pocetak*2)) ||
        !(Number.isInteger(kraj) || Number.isInteger(kraj*2))) {
        res.json({message:"Aktivnost nije validna!"});
        return;
    }
    //console.log(presjek(12, 15, pocetak, kraj));
    let novaLinija = naziv + "," + tip + "," + pocetak + "," + kraj + "," + dan + "\n";

    fs.readFile('resursi/aktivnosti.txt', function(err, buffer) {
        if(err) throw err;
        var procitano = buffer.toString("utf-8");
        var arr = procitano.split("\n");
        let greska = 0;
        // provjera da li se poklapa vrijeme aktivnosti sa nekom koja je vec upisana
        arr.forEach(element => {
            //console.log("linija: " + element);
            if(element == null || element == "") return;
            var linija = element.split(",");
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

app.delete('/aktivnost/:naziv', function (req, res) {
    let naziv = req.params.naziv;
    //console.log(req.params);
    fs.readFile('resursi/aktivnosti.txt', function(err, buffer) {
        if(err) throw err;
        var procitano = buffer.toString("utf-8");
        var arr = procitano.split("\n");
        // trazenje aktivnosti sa nazivom
        let zaIzbrisati = [];
        for(let i = 0; i < arr.length; i++) {
            var element = arr[i];
            //console.log("linija: " + element);
            if(element != "") {
                var linija = element.split(",");
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

app.delete('/predmet/:naziv', function (req, res) {
    let naziv = req.params.naziv;
    //console.log(req.params);
    fs.readFile('resursi/predmeti.txt', function(err, buffer) {
        if(err) throw err;
        var procitano = buffer.toString("utf-8");
        var arr = procitano.split("\n");
        // trazenje aktivnosti sa nazivom
        let zaIzbrisati = [];
        for(let i = 0; i < arr.length; i++) {
            var element = arr[i];
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

app.delete('/all', function (req, res) {
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

// server radi na sljedecem portu
app.listen(PORT);