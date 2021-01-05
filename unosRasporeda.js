var request = require('request');

function unesiRaspored() {
    let predmeti = [];
    let aktivnost = [];
    try {
        predmeti = posaljiZahtjev("GET", "/predmeti", {});
        alert(predmeti);
    } catch(err) {
        alert(err);
        //alert("Ne mogu se pročitati predmeti iz fajla!");
    }
}

function posaljiZahtjev(operacija, ruta, ulaz) {
    let options = {
        "method": operacija,
        "url": 'http://localhost:' + 3000 + ruta,
        "headers": ulaz
    };
    let izlaz = null;
    request(options, function (error, response) {
        if (error) throw new Error(error);
        izlaz = response;
    });
    return izlaz;
}