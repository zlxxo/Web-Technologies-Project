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

// make the server listen to requests
app.listen(PORT);