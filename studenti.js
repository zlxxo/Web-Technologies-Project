let grupe = [];

window.onload = () => {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            grupe = this.responseText;
        }
    });
    xhr.open("GET", "http://localhost:3000/v2/grupa");
    xhr.send();
}


function unesiStudente() {
    alert("Unos");
}