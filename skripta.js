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
                    {naziv: "OOI"},
                    {naziv: "OIS"},
                    {naziv: "VVS"}];
    res.send(JSON.stringify(predmeti));
});

app.get('/aktivnosti', function (req, res) {});

app.get('/predmet/:naziv/aktivnost/', function (req, res) {});

app.post('/predmet', function (req, res) {});

app.post('/aktivnost', function (req, res) {});

app.delete('/aktivnost/:naziv', function (req, res) {});

app.delete('/predmet/:naziv', function (req, res) {});

app.delete('/all', function (req, res) {});

// server radi na sljedecem portu
app.listen(PORT);