function iscrtajRaspored(div, dani, satPocetak, satKraj) {
    if(satPocetak >= satKraj || satPocetak < 0 || satPocetak > 24 || satKraj < 0 ||
        satKraj > 24 || !Number.isInteger(satPocetak) || !Number.isInteger(satKraj)) {
        div.innerHTML += "Greška";
    }
}

function dodajAktivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) {

}