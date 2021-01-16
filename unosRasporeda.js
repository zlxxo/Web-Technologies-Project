let predmeti = [];
let aktivnosti = [];
let dani = [];
let tipovi = [];
let grupe = [];

window.onload = () => {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            predmeti = JSON.parse(this.responseText);
            //alert(JSON.stringify(predmeti));
        }
    });
    xhr.open("GET", "http://localhost:3000/v2/predmet");
    xhr.send();

    var xhr2 = new XMLHttpRequest();
    xhr2.withCredentials = true;
    xhr2.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            aktivnosti = JSON.parse(this.responseText);
            //alert(JSON.stringify(aktivnosti));
        }
    });
    xhr2.open("GET", "http://localhost:3000/v2/aktivnost");
    xhr2.send();

    var xhr3 = new XMLHttpRequest();
    xhr3.withCredentials = true;
    xhr3.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            tipovi = JSON.parse(this.responseText);
            //alert(JSON.stringify(tipovi));
            let tp = document.getElementById("tip");
            let opcije = "";
            for(let i = 0; i < tipovi.length; i++) {
                let tip = tipovi[i];
                opcije += "<option id='" + tip.id + "'>" + tip.naziv + "</option>";
            }
            tp.innerHTML += opcije;
        }
    });
    xhr3.open("GET", "http://localhost:3000/v2/tip");
    xhr3.send();

    var xhr4 = new XMLHttpRequest();
    xhr4.withCredentials = true;
    xhr4.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            dani = JSON.parse(this.responseText);
            //alert(JSON.stringify(dani));
            let dn = document.getElementById("dan");
            let opcije = "";
            for(let i = 0; i < dani.length; i++) {
                let dan = dani[i];
                opcije += "<option id='" + dan.id + "'>" + dan.naziv + "</option>";
            }
            dn.innerHTML += opcije;
        }
    });
    xhr4.open("GET", "http://localhost:3000/v2/dan");
    xhr4.send();

    var xhr5 = new XMLHttpRequest();
    xhr5.withCredentials = true;
    xhr5.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            grupe = JSON.parse(this.responseText);
            //alert(JSON.stringify(dani));
            let gr = document.getElementById("grupa");
            let opcije = "";
            for(let i = 0; i < grupe.length; i++) {
                let grupa = grupe[i];
                opcije += "<option id='" + grupa.id + "'>" + grupa.naziv + "</option>";
            }
            gr.innerHTML += opcije;
        }
    });
    xhr5.open("GET", "http://localhost:3000/v2/grupa");
    xhr5.send();
}


function unesiRaspored() {
    let naziv = document.getElementById('naziv').value;
    let nazivPredmeta = document.getElementById('naziv-predmeta').value;
    //alert(naziv);
    let tp = document.getElementById("tip");
    let tipId = tp.options[tp.selectedIndex].id;
    let tip = pronadjiTip(tipId);
    //alert(JSON.stringify(tip));
    let pocetak = document.getElementById("vrijeme-pocetka").value;
    //alert(pocetak);
    let kraj = document.getElementById("vrijeme-kraja").value;
    //alert(kraj);
    let dn = document.getElementById("dan");
    let danId = dn.options[dn.selectedIndex].id;
    let dan = pronadjiDan(danId);
    //alert(JSON.stringify(dan));

    if(naziv != null && naziv != "" && nazivPredmeta != null && nazivPredmeta != "" &&
        tip != null && pocetak != null && kraj != null && dan != null) {
        if(!(pocetak[3] == 3 || pocetak[3] == 0) || pocetak[4] != 0) {
            alert("Vrijeme početka aktivnosti nije u ispravnom formatu!");
            return;
        }

        if(!(kraj[3] == 3 || kraj[3] == 0) || kraj[4] != 0) {
            alert("Vrijeme kraja aktivnosti nije u ispravnom formatu!");
            return;
        }

        if(pocetak[3] == 3) {
            pocetak = parseFloat(pocetak) + 0.5;
        } else {
            pocetak = parseInt(pocetak);
        }

        if(kraj[3] == 3) {
            kraj = parseFloat(kraj) + 0.5;
        } else {
            kraj = parseInt(kraj);
        }

        let greska = false;

        let pr = pronadjiPredmet(nazivPredmeta);

        if(pr == null) {
            var data = JSON.stringify({naziv: nazivPredmeta});
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    if(this.responseText == "Predmet već upisan!") {
                        greska = true;
                        alert("Greška! Neuspješno upisivanje novog predmeta!");
                    } else {
                        pr = JSON.parse(this.responseText);
                    }
                }
            });
            xhr.open("POST", "http://localhost:3000/v2/predmet");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);

        }
        
        if(!greska){
            var data2 = JSON.stringify({
                naziv: naziv,
                pocetak: pocetak,
                kraj: kraj,
                predmetId: pr.id,
                danId: dan.id,
                tipId: tip.id
            });
            var xhr2 = new XMLHttpRequest();
            xhr2.withCredentials = true;
            xhr2.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    if(this.responseText != JSON.stringify({message:"Uspješno dodana aktivnost!"})) {
                        var xhr3 = new XMLHttpRequest();
                        xhr3.withCredentials = true;
                        xhr3.addEventListener("readystatechange", function() {
                          if(this.readyState === 4) {
                            console.log(this.responseText);
                          }
                        });
                        xhr3.open("DELETE", "http://localhost:3000/v2/predmet/" + pr.id);
                        xhr3.send();
                        alert("Greška! Neuspješno upisivanje aktivnosti!");
                    } else {
                        alert("Uspješno upisana aktivnost!");
                    }
                }
            });
            xhr2.open("POST", "http://localhost:3000/v2/aktivnost");
            xhr2.setRequestHeader("Content-Type", "application/json");
            xhr2.send(data2);
        }
    }
}

function pronadjiTip(id) {
    for(let i = 0; i < tipovi.length; i++) {
        if(tipovi[i].id == id) {
            return tipovi[i];
        }
    }
    return null;
}

function pronadjiDan(id) {
    for(let i = 0; i < dani.length; i++) {
        if(dani[i].id == id) {
            return dani[i];
        }
    }
    return null;
}

function pronadjiGrupu(id) {
    if(id == "prazno") {
        return null;
    }
    for(let i = 0; i < grupe.length; i++) {
        if(grupe[i].id == id) {
            return grupe[i];
        }
    }
    return null;
}

function pronadjiPredmet(naziv) {
    for(let i = 0; i < predmeti.length; i++) {
        if(predmeti[i].naziv == naziv) {
            return predmeti[i];
        }
    }
    return null;
}