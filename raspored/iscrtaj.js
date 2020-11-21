function iscrtajRaspored(div, dani, satPocetak, satKraj) {
    if(satPocetak >= satKraj || satPocetak < 0 || satPocetak > 24 || satKraj < 0 ||
        satKraj > 24 || !Number.isInteger(satPocetak) || !Number.isInteger(satKraj)) {
        div.innerHTML += "Greška";
    } else {
        let kod = "";
        kod += "<table>\n";
        for (let red = 0; red < 1; red++) {
            if(red === 0) {
                kod += "<tr class='satnica'>";
            } else {
                kod += "<tr>";
            }
            for (let kolona = 0; kolona < 11; kolona++) {
                if(red === 0) {
                    if(kolona === 0) {
                        kod += "<td class='vrijeme' colspan='3'></td>\n";
                    } else {
                        kod += "<td class='vrijeme' colspan='2'>08:00</td>\n";
                    }
                }
            }
            kod += "</tr>\n";
        }
        kod += "</table>\n";
        alert(kod);
        div.innerHTML += kod;
    }
}

function dodajAktivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) {

}