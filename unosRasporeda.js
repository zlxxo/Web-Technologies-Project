const request = require('request');
const PORT = 3000;

function unesiRaspored() {
    let predmeti = [];
    let aktivnost = [];
    try {
        predmeti = posaljiZahtjev("GET", "/predmeti", {});
        alert(predmeti);
    } catch(err) {
        alert("Ne mogu se pročitati predmeti iz fajla!");
    }
}

function posaljiZahtjev(operacija, ruta, ulaz) {
    let options = {
        "method": operacija,
        "url": 'http://localhost:' + PORT + ruta,
        "headers": ulaz
    };
    let izlaz = null;
    request(options, function (error, response) {
        alert(response);
        if (error) throw new Error(error);
        izlaz = response;
    });
    return izlaz;
}