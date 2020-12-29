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
var predmeti = [{naziv:"WT"},
                {naziv:"RMA"},
                {naziv:"RG"},
                {naziv:"DM"},
                {naziv:"OOI"},
                {naziv:"OIS"},
                {naziv:"VVS"}];
app.get('/predmeti', function (req, res) {
    res.send(predmeti);
});

var aktivnosti = [{naziv:"WT",tip:"predavanje",pocetak:9,kraj:12,dan:"Ponedjeljak"},
                  {naziv:"WT",tip:"vježbe",pocetak:12,kraj:14,dan:"Ponedjeljak"},
                  {naziv:"RMA",tip:"predavanje",pocetak:14,kraj:17,dan:"Ponedjeljak"},
                  {naziv:"RMA",tip:"vježbe",pocetak:12,kraj:14,dan:"Utorak"},
                  {naziv:"DM",tip:"tutorijal",pocetak:14,kraj:16,dan:"Utorak"},
                  {naziv:"DM",tip:"predavanje",pocetak:16,kraj:18,dan:"Utorak"},
                  {naziv:"OI",tip:"predavanje",pocetak:12,kraj: 15,dan:"Srijeda"}];

app.get('/aktivnosti', function (req, res) {
    res.send(JSON.stringify(aktivnosti));
});

app.get('/predmet/:naziv/aktivnost/', function (req, res) {
    let naziv = req.params.naziv;
    let aktivnosti_predmeta = [];
    for(let i = 0; i < aktivnosti.length; i++) {
        let aktivnost = aktivnosti[i];
        if(aktivnost.naziv == naziv) {
            aktivnosti_predmeta.push(aktivnost);
        }
    }
    res.send(JSON.stringify(aktivnosti_predmeta));
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
    fs.appendFile('resursi/aktivnosti.txt', novaLinija, function(err) {
        if(err) throw err;
        res.json({message:"Uspješno dodana aktivnost!"});
    });
});

app.delete('/aktivnost/:naziv', function (req, res) {});

app.delete('/predmet/:naziv', function (req, res) {});

app.delete('/all', function (req, res) {});

// server radi na sljedecem portu
app.listen(PORT);