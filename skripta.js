const express = require("express");
var app = express();
var path = require('path');
const PORT = 3000;

app.use(express.static(__dirname + '/'));

/*app.use('', express.static(__dirname + '/aktivnost'));
app.use('', express.static(__dirname + '/planiranjeNastavnik'));
app.use('', express.static(__dirname + '/iscrtavanje'));
app.use('', express.static(__dirname + '/podaciStudent'));
app.use('', express.static(__dirname + '/raspored'));*/


app.get('/predmeti', function (req, res) {});

app.get('/aktivnosti', function (req, res) {});

app.get('/predmet/:naziv/aktivnost/', function (req, res) {});

app.post('/predmet', function (req, res) {});

app.post('/aktivnost', function (req, res) {});

app.delete('/aktivnost/:naziv', function (req, res) {});

app.delete('/predmet/:naziv', function (req, res) {});

app.delete('/all', function (req, res) {});

// make the server listen to requests
app.listen(PORT);