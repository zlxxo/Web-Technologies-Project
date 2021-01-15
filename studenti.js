let grupe = [];
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

let prouke = [];

function unesiStudente() {
    let tekst = document.getElementById("studenti").value;
    let studenti = tekst.split("\n");

    let gr = document.getElementById("grupe");
    let grupaId = gr.options[gr.selectedIndex].id;
    let grupa = pronadjiGrupu(grupaId);

    poruke = [];
    tekst.value = "";

    for(let i = 0; i < studenti.length; i++) {
        
        let linija = studenti[i];
        let podaci = linija.split(",");
        let ime = podaci[0];
        let index = podaci[1];
        const student = {
            ime: ime,
            index: index,
        };

        var data = JSON.stringify(student);
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                let odgovor = JSON.parse(this.responseText);
                if(odgovor.poruka != "Student je već upisan!" &&
                    odgovor.poruka != "Kreiran student novi student!") {
                    poruke.push(odgovor.poruka);
                    tekst.value += odgovor.poruka;
                }
            }
        });
        xhr.open("POST", "http://localhost:3000/v2/student");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(data);
    }

    alert("");
}

function pronadjiGrupu(id) {
    for(let i = 0; i < grupe.length; i++) {
        if(grupe[i].id == id) {
            return grupe[i];
        }
    }
    return null;
}

function pronadjiPredmet(id) {
    for(let i = 0; i < predmeti.length; i++) {
        if(predmeti[i].id == id) {
            return predmeti[i];
        }
    }
    return null;
}