let supertest = require("supertest");
let app = require("../skripta.js");
let fs = require('fs');

describe('Testiranje - spirala 3', function() {

    let arr = [];

    before('Čitanje testnih podataka', (done) => {
        fs.readFile('resursi/testniPodaci.txt', 'utf-8', function(err, buffer) {
            if(err) {
                console.log(err);
                return;
            }
            arr = buffer.split("\r\n");
            done(); 
        });
    });

    describe('Testiranje', function() {
        it('Brisanje podataka', (done) => {
            let test = arr[0].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "DELETE") {
                supertest(app)
                    .delete(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });


        it('Nije upisan nijedan predmet', (done) => {
            let test = arr[1].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "GET") {
                supertest(app)
                    .get(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Nije upisana nijedna aktivnost', (done) => {
            let test = arr[2].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "GET") {
                supertest(app)
                    .get(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Nije upisana nijedna aktivnost za predmet', (done) => {
            let test = arr[3].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "GET") {
                supertest(app)
                    .get(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Uspješno upisan predmet (WT)', (done) => {
            let test = arr[4].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "POST") {
                supertest(app)
                    .post(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Upisan samo jedan predmet (WT)', (done) => {
            let test = arr[5].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "GET") {
                supertest(app)
                    .get(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Upisivanje predmeta sa istim nazivom', (done) => {
            let test = arr[6].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "POST") {
                supertest(app)
                    .post(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Upisan samo jedan predmet (WT)', (done) => {
            let test = arr[7].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "GET") {
                supertest(app)
                    .get(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Uspješno upisan novi predmet (RPR)', (done) => {
            let test = arr[8].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "POST") {
                supertest(app)
                    .post(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Uspješno upisan novi predmet (RMA)', (done) => {
            let test = arr[9].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "POST") {
                supertest(app)
                    .post(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Upisana 3 predmeta (WT, RPR, RMA)', (done) => {
            let test = arr[10].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "GET") {
                supertest(app)
                    .get(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Uspješno upisana aktivnost (WT)', (done) => {
            let test = arr[11].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "POST") {
                supertest(app)
                    .post(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Upisana samo jedna aktivnost (WT)', (done) => {
            let test = arr[12].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "GET") {
                supertest(app)
                    .get(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Upis nevalidne aktivnosti', (done) => {
            let test = arr[13].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "POST") {
                supertest(app)
                    .post(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Upisana samo jedna aktivnost (WT)', (done) => {
            let test = arr[14].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "GET") {
                supertest(app)
                    .get(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Upisana samo jedna aktivnost za WT', (done) => {
            let test = arr[15].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "GET") {
                supertest(app)
                    .get(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Uspješno upisana nova aktivnost (RMA)', (done) => {
            let test = arr[16].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "POST") {
                supertest(app)
                    .post(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Upisane 2 aktivnosti (WT, RMA)', (done) => {
            let test = arr[17].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "GET") {
                supertest(app)
                    .get(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Upisana samo jedna aktivnost za WT', (done) => {
            let test = arr[18].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "GET") {
                supertest(app)
                    .get(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Brisanje nepostojeće aktivnosti (OIS)', (done) => {
            let test = arr[19].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "DELETE") {
                supertest(app)
                    .delete(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Upisane 2 aktivnosti (WT, RMA)', (done) => {
            let test = arr[20].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "GET") {
                supertest(app)
                    .get(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Brisanje postojeće aktivnosti (RMA)', (done) => {
            let test = arr[21].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "DELETE") {
                supertest(app)
                    .delete(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Upisana samo jedna aktivnosti (WT)', (done) => {
            let test = arr[22].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "GET") {
                supertest(app)
                    .get(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Brisanje nepostojećeg predmeta (OIS)', (done) => {
            let test = arr[23].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "DELETE") {
                supertest(app)
                    .delete(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Upisana 3 predmeta aktivnosti (WT, RPR, RMA)', (done) => {
            let test = arr[24].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "GET") {
                supertest(app)
                    .get(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Brisanje postojećeg predmeta (RPR)', (done) => {
            let test = arr[25].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "DELETE") {
                supertest(app)
                    .delete(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Upisana 2 predmeta (WT, RMA)', (done) => {
            let test = arr[26].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "GET") {
                supertest(app)
                    .get(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });

        it('Brisanje upisanih podataka', (done) => {
            let test = arr[27].split(";");
            let operacija = test[0];
            let ruta = test[1];
            let ulaz = test[2];
            if(ulaz == "null" || ulaz == null) {
                ulaz = "{}";
            }
            let izlaz = test[3];
            if (operacija == "DELETE") {
                supertest(app)
                    .delete(ruta)
                    .send(JSON.parse(ulaz))
                    .expect(izlaz)
                    .end(function(err, res) {
                        if(err) done(err);
                        done();
                    });
            }
        });
    });
});