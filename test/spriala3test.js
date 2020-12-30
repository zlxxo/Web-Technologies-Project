var assert = require('assert');
var path = require('path');
var fs = require('fs');
var request = require('request');
const PORT = 3000;

describe('Testiranje - spirala 3', function() {
    fs.readFile('resursi/testniPodaci.txt', function(err, buffer) {
        if(err) throw err;
        var procitano = buffer.toString("utf-8");
        var arr = procitano.split("\n");
        for(let i = 0; i < arr.length; i++) {
            var element = arr[i];
            if(element != "") {
                var linija = element.split(";");
                var operacija = linija[0];
                var ruta = linija[1];
                var ulaz = JSON.parse(linija[2]);
                var izlaz = JSON.parse(linija[3]);
                //console.log("ulaz ", ulaz);
                //console.log("izlaz ", izlaz);
                var metoda = operacija + " " + ruta;
                describe(metoda, function() {
                    var poruka = "ocekivan izlaz: " + JSON.stringify(izlaz);
                    it(poruka, function() {
                        var options = {
                            'method': operacija,
                            'url': 'http://localhost:' + PORT + ruta,
                            'headers': {
                            }
                          };
                          request(options, function (error, response) {
                            if (error) throw new Error(error);
                            //console.log(JSON.parse(response.body), izlaz);
                            assert.equal(JSON.parse(response.body).message, izlaz.message);
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