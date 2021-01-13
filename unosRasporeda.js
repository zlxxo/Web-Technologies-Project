let predmeti = [];
let aktivnosti = [];

window.onload = () => {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            predmeti = this.responseText;
        }
    });
    xhr.open("GET", "http://localhost:3000/v1/predmeti");
    xhr.send();

    var xhr2 = new XMLHttpRequest();
    xhr2.withCredentials = true;
    xhr2.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            aktivnosti = this.responseText;
        }
    });
    xhr2.open("GET", "http://localhost:3000/v1/aktivnosti");
    xhr2.send();    
}


function unesiRaspored() {
    let naziv = document.getElementById('naziv-predmeta').value;
    let tip = document.getElementById("tip").value;
    let pocetak = document.getElementById("vrijeme-pocetka").value;
    let kraj = document.getElementById("vrijeme-kraja").value;
    let dan = document.getElementById("dan").value;

    if(naziv != null && naziv != "" && tip != null && pocetak != null && kraj != null && dan != null) {
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
        if(!predmeti.includes(naziv)) {
            var data = JSON.stringify({naziv:naziv});
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    if(this.responseText != JSON.stringify({message:"Uspješno dodan predmet!"})) {
                        greska = true;
                        alert("Greška! Neuspješno upisivanje novog predmeta!");
                    }
                }
            });
            xhr.open("POST", "http://localhost:3000/v1/predmet");
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(data);
        }

        if(!greska){
            var data2 = JSON.stringify({naziv:naziv,tip:tip,pocetak:pocetak,kraj:kraj,dan:dan});
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
                        xhr3.open("DELETE", "http://localhost:3000/v1/predmet/" + naziv);
                        xhr3.send();
                        alert("Greška! Neuspješno upisivanje aktivnosti!");
                    } else {
                        alert("Uspješno upisana aktivnost!");
                    }
                }
            });
            xhr2.open("POST", "http://localhost:3000/v1/aktivnost");
            xhr2.setRequestHeader("Content-Type", "application/json");
            xhr2.send(data2);
        }
    }    
}