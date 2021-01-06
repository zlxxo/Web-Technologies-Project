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
    xhr.open("GET", "http://localhost:3000/predmeti");
    xhr.send();

    var xhr2 = new XMLHttpRequest();
    xhr2.withCredentials = true;
    xhr2.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            aktivnosti = this.responseText;
        }
    });
    xhr2.open("GET", "http://localhost:3000/aktivnosti");
    xhr2.send();    
}


function unesiRaspored() {
    let naziv = document.getElementById('naziv-predmeta').value;
    let tip = document.getElementById("tip").value;
    let pocetak = document.getElementById("vrijeme-pocetka").value;
    let kraj = document.getElementById("vrijeme-kraja").value;
    let dan = document.getElementById("dan").value;

    if(naziv != null && naziv != "" && tip != null && pocetak != null && kraj != null && dan != null) {
        let greska = false;
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
            kraj = parseFloat(pocetak) + 0.5;
        } else {
            kraj = parseInt(pocetak);
        }
    }    
}