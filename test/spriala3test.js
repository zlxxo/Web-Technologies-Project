const assert = require('assert');
const path = require('path');
const fs = require('fs');
const request = require('request');
const { json } = require('body-parser');
const PORT = 3000;

describe('Testiranje - spirala 3', function() {
    fs.readFile('resursi/testniPodaci.txt', function(err, buffer) {
        if(err) throw err;
        let procitano = buffer.toString("utf-8");
        let arr = procitano.split("\n");
        for(let i = 0; i < arr.length; i++) {
            let element = arr[i];
            if(element != "") {
                let linija = element.split(";");
                let operacija = linija[0];
                let ruta = linija[1];
                let ulaz = linija[2];
                let izlaz = linija[3].replace("\r", "");
                //console.log("ulaz " + i + " ", ulaz);
                //console.log("izlaz " + i + " ", izlaz);
                let metoda = operacija + " " + ruta;
                describe(metoda, function() {
                    let poruka = "ocekivan izlaz: " + izlaz;
                    let options = {
                        'method': operacija,
                        'url': 'http://localhost:' + PORT + ruta,
                        'headers': {}
                    };
                    if(operacija == "POST") {
                        options = {
                            'method': operacija,
                            'url': 'http://localhost:' + PORT + ruta,
                            'headers': JSON.parse(ulaz)
                        };
                    }
                    //console.log(options);
                    it(poruka, function() {
                        request(options, function (error, response) {
                            if (error) throw new Error(error);
                            //console.log(JSON.parse(response.body), izlaz);
                            assert.deepEqual(response.body, izlaz);
                        });
                    });
                });
            }
        }
    });

    describe('potrebno da bi se mogli pokrenuti testovi pročitani iz fajla', function() {
        it('potrebno da bi se mogli pokrenuti testovi pročitani iz fajla', function() {
        });
    });
});