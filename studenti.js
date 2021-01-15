let grupe = [];
let studenti = [];
let predmeti = [];

window.onload = () => {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            grupe = JSON.parse(this.responseText);
            let gr = document.getElementById("grupe");
            let opcije = "";
            for(let i = 0; i < grupe.length; i++) {
                let grupa = grupe[i];
                opcije += "<option id='" + grupa.id + "'>" + grupa.naziv + "</option>";
            }
            gr.innerHTML += opcije;
        }
    });
    xhr.open("GET", "http://localhost:3000/v2/grupa");
    xhr.send();

    var xhr2 = new XMLHttpRequest();
    xhr2.withCredentials = true;
    xhr2.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            studenti = JSON.parse(this.responseText);
        }
    });
    xhr2.open("GET", "http://localhost:3000/v2/student");
    xhr2.send();

    var xhr3 = new XMLHttpRequest();
    xhr3.withCredentials = true;
    xhr3.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            predmeti = JSON.parse(this.responseText);
        }
    });
    xhr3.open("GET", "http://localhost:3000/v2/predmet");
    xhr3.send();
}


function unesiStudente() {
    let tekst = document.getElementById("studenti").value;
    let studenti1 = tekst.split("\n");
    let gr = document.getElementById("grupe");
    let grupaId = gr.options[gr.selectedIndex].id;
    for(let i = 0; i < studenti1.length; i++) {
        let linija = studenti1[i];
        let podaci = linija.split(",");
        let ime = podaci[0];
        let index = podaci[1];
        const student = {
            ime: ime,
            index: index,
            GrupaId: grupaId
        };
    }

    alert(JSON.stringify(grupe));
    alert(JSON.stringify(studenti));
    alert(JSON.stringify(predmeti));
}