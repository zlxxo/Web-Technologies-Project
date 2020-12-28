const express = require("express");
var app = express();
var path = require('path');
const PORT = 3000;

// pristup statickim fajlovima preko servera
app.use(express.static(__dirname + '/'));

// rute
app.get('/predmeti', function (req, res) {
    var predmeti = [{naziv: "WT"},
                    {naziv: "RMA"},
                    {naziv: "RG"},
                    {naziv: "DM"},
                    {naziv: "OOI"},
                    {naziv: "OIS"},
                    {naziv: "VVS"}];
    res.send(JSON.stringify(predmeti));
});

app.get('/aktivnosti', function (req, res) {
    var aktivnosti = [{naziv: "WT", tip: "predavanje", pocetak: 9, kraj: 12, dan: "Ponedjeljak"},
                      {naziv: "WT", tip: "vježbe", pocetak: 12, kraj: 14, dan: "Ponedjeljak"},
                      {naziv: "RMA", tip: "predavanje", pocetak: 14, kraj: 17, dan: "Ponedjeljak"},
                      {naziv: "RMA", tip: "vježbe", pocetak: 12, kraj: 14, dan: "Utorak"},
                      {naziv: "DM", tip: "tutorijal", pocetak: 14, kraj: 16, dan: "Utorak"},
                      {naziv: "DM", tip: "predavanje", pocetak: 16, kraj: 18, dan: "Utorak"},
                      {naziv: "OI", tip: "predavanje", pocetak: 12, kraj: 15, dan: "Srijeda"}];
    res.send(JSON.stringify(aktivnosti));
});

app.get('/predmet/:naziv/aktivnost/', function (req, res) {});

app.post('/predmet', function (req, res) {});

app.post('/aktivnost', function (req, res) {});

app.delete('/aktivnost/:naziv', function (req, res) {});

app.delete('/predmet/:naziv', function (req, res) {});

app.delete('/all', function (req, res) {});

// server radi na sljedecem portu
app.listen(PORT);