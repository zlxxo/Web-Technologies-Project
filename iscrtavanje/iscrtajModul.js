function generisiRasporede() {
    let okvir = document.getElementById("okvir");
    iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 08, 21);
    dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
    dodajAktivnost(okvir, "WT", "vježbe", 12, 13.5, "Ponedjeljak");
    dodajAktivnost(okvir, "RMA", "predavanje", 14, 17, "Ponedjeljak");
    dodajAktivnost(okvir, "RMA", "vježbe", 12.5, 14, "Utorak");
    dodajAktivnost(okvir, "DM", "tutorijal", 14, 16, "Utorak");
    dodajAktivnost(okvir, "DM", "predavanje", 16, 19, "Utorak");
    dodajAktivnost(okvir, "OI", "predavanje", 12, 15, "Srijeda");
    let okvir1 = document.getElementById("okvir1");
    iscrtajRaspored(okvir1, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 12, 12);
    // nevalidna dodavanja aktivnosti
    dodajAktivnost(okvir1, "RMA", "vježbe", 12.5, 14, "Utorak");
    dodajAktivnost(okvir, "RMA", "vježbe", 12.5, 14, "Utorak");
    dodajAktivnost(okvir, "RMA", "vježbe", 12.5, 14, "U");
    dodajAktivnost(okvir, "RMA", "vježbe", 12.05, 14, "Utorak");
    dodajAktivnost(okvir, "RMA", "vježbe", 15, 14, "Cetvrtak");
    dodajAktivnost(okvir, "RMA", "tutorijal", 11.5, 13.5, "Petak");
}

function iscrtajRaspored(div, dani, satPocetak, satKraj) {
    if(satPocetak >= satKraj || satPocetak < 0 || satPocetak > 24 || satKraj < 0 ||
        satKraj > 24 || !Number.isInteger(satPocetak) || !Number.isInteger(satKraj)) {
        div.innerHTML += "Greška";
        return;
    }

    let kod = "";
    kod += "<table>\n";
    for (let red = 0; red <= dani.length; red++) {
        var dan;
        let sat = satPocetak;
        if(red === 0) {
            kod += "<tr class='satnica'>\n";
        } else {
            kod += "<tr>\n";
            dan = dani[red - 1];
        }
        
        let pola = true;
        for (let kolona = 0; kolona <= (satKraj - satPocetak)*2; kolona++) {
            if(red === 0) {
                if(kolona === 0) {
                    kod += "<td class='vrijeme' colspan='3'></td>\n";
                } else if(kolona%2 === 1) {
                    if(kolona%2 === 1 && ((sat <= 12 && sat%2 === 0) || (sat > 13 && sat < satKraj && sat%2 === 1))) {
                        let jednocifreni = "";
                        if(sat < 10) {
                            jednocifreni += "0"
                        }
                        kod += "<td class='vrijeme' colspan='2'>" + jednocifreni + sat + ":00</td>\n";
                    } else {
                        kod += "<td class='vrijeme' colspan='2'></td>\n";
                    }
                }
                    
            } else {
                if(kolona === 0) {
                    if(red === 1) {
                        kod += "<td class='prvi dan' colspan='4'>" + dan + "</td>\n";
                    } else {
                        kod += "<td class='dan' colspan='4'>" + dan + "</td>\n";
                    }
                } else {
                    if(kolona%2 === 0) {
                        if(sat === 18) {
                            kod += "<td id='" + div.id + "-" + dan.toLowerCase() + "-pola-" +
                            (sat + 1).toString() + "' class='sat pola prije-19'></td>\n";
                        } else {
                            kod += "<td id='" + div.id + "-" + dan.toLowerCase() + "-pola-" +
                            (sat + 1).toString() + "' class='sat pola'></td>\n";
                        }
                    } else {
                        if(sat === 19) {
                            kod += "<td id='" + div.id + "-" + dan.toLowerCase() + "-" +
                            sat.toString() + "' class='sat cijeli poslije-19'></td>\n";
                        } else {
                            kod += "<td id='" + div.id + "-" + dan.toLowerCase() + "-" +
                            sat.toString() + "' class='sat cijeli'></td>\n";
                        }
                    }
                }
            }
            pola = !pola;
            if(kolona%2 === 0 && kolona != 0) {
                sat++;
            }
        }
        kod += "</tr>\n";
    }
    kod += "</table>\n";
    div.innerHTML += kod;
}

function generisiID(div, dan, vrijemePocetak) {
    let id = div.id + "-" + dan.toLowerCase() + "-";
    if(vrijemePocetak - Number.parseInt(vrijemePocetak) < 0.5) {
        id += vrijemePocetak.toString();
    } else {
        id += "pola-" + (Number.parseInt(vrijemePocetak) + 1).toString();
    }
    return id;
}

function dodajAktivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) {
    if(raspored === null || !raspored.innerHTML.includes("<table>")) {
        alert("Greška - raspored nije kreiran!");
        return;
    } else if(!raspored.innerHTML.includes(dan + "</td>") ||
        (vrijemePocetak < 0 || vrijemeKraj > 24 || vrijemePocetak >= vrijemeKraj ||
        !(Number.isInteger(vrijemePocetak) || Number.isInteger(vrijemePocetak*2)) ||
        !(Number.isInteger(vrijemeKraj) || Number.isInteger(vrijemeKraj*2)))) {
        alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin!");
        return;
    }

    let polja = [];
    let i = 0;
    for(let vrijeme = vrijemePocetak*2; vrijeme < vrijemeKraj*2; vrijeme++) {
        let id = generisiID(raspored, dan, vrijeme/2);
        var polje = document.getElementById(id);
        if(polje != null && polje.innerHTML != "") {
            alert("Greška - već postoji termin u rasporedu u zadanom vremenu!");
            return;
        }
        if(i === 0) {
            if(Number.isInteger(vrijemePocetak) && vrijemePocetak != 19) {
                polje.style.borderLeftStyle = "solid";
            } else {
                polje.style.borderLeftStyle = "dashed"
            }
            if(Number.isInteger(vrijemeKraj) && vrijemeKraj != 19) {
                polje.style.borderRightStyle = "solid";
            } else {
                polje.style.borderRightStyle = "dashed"
            }
            polje.style.backgroundColor = "#dee7f0";
            polje.colSpan = ((vrijemeKraj - vrijemePocetak)*2).toString();
            let kod = "<div class='cas'>\n<p class='predmet'>" + naziv + "</p>\n<p class='tip'>" + tip + "</p></div>";
            polje.innerHTML += kod;
        } else {
            polje.parentNode.removeChild(polje);
        }
        polja.push(polje);
        i++;
    }
}