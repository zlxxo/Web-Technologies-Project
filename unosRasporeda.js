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
    alert(naziv);
    let tip = document.getElementById("tip").value;
    alert(tip);
    let pocetak = document.getElementById("vrijeme-pocetka").value;
    alert(pocetak);
    alert(pocetak[2]);
    let kraj = document.getElementById("vrijeme-kraja").value;
    alert(kraj);
    let dan = document.getElementById("dan").value;
    alert(dan);
}