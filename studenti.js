let grupe = [];

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
}


function unesiStudente() {
    let tekst = document.getElementById("studenti").value;
    let studenti = tekst.split("\n");
    let gr = document.getElementById("grupe");
    let grupaId = gr.options[gr.selectedIndex].id;
    for(let i = 0; i < studenti.length; i++) {
        let linija = studenti[i];
        let podaci = linija.split(",");
        let ime = podaci[0];
        let index = podaci[1];
        const student = {
            ime: ime,
            index: index,
            GrupaId: grupaId
        };
        alert(JSON.stringify(student));
    }
}