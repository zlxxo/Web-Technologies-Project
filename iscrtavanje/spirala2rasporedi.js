let okvir = document.getElementById("okvir");
iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 08, 21);
dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
//dodajAktivnost(okvir, "WT", "vježbe", 12, 13.5, "Ponedjeljak");
//dodajAktivnost(okvir, "RMA", "predavanje", 14, 17, "Ponedjeljak");
dodajAktivnost(okvir, "RMA", "vježbe", 12.5, 14, "Utorak");
//dodajAktivnost(okvir, "DM", "tutorijal", 14, 16, "Utorak");
//dodajAktivnost(okvir, "DM", "predavanje", 16, 19, "Utorak");
//dodajAktivnost(okvir, "OI", "predavanje", 12, 15, "Ponedjeljak");


function iscrtajRaspored(div, dani, satPocetak, satKraj) {
    if(satPocetak >= satKraj || satPocetak < 0 || satPocetak > 24 || satKraj < 0 ||
        satKraj > 24 || !Number.isInteger(satPocetak) || !Number.isInteger(satKraj)) {
        div.innerHTML += "Greška";
    } else {
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
                                kod += "<td id='" + dan.toLowerCase() + "-pola-" +
                                (sat - 1).toString() + "' class='sat pola prije-19'></td>\n";
                            } else {
                                kod += "<td id='" + dan.toLowerCase() + "-pola-" + (sat - 1).toString() + "' class='sat pola'></td>\n";
                            }
                        } else {
                            if(sat === 19) {
                                kod += "<td id='" + dan.toLowerCase() + "-" +
                                sat.toString() + "' class='sat cijeli poslije-19'></td>\n";
                            } else {
                                kod += "<td id='" + dan.toLowerCase() + "-" + sat.toString() + "' class='sat cijeli'></td>\n";
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
}

function dodajAktivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) {
    let id = dan.toLowerCase() + "-";
    if(vrijemePocetak - Number.parseInt(vrijemePocetak) < 0.5) {
        id += vrijemePocetak.toString();
    } else {
        id += "pola-" + (Number.parseInt(vrijemePocetak) + 1).toString();
    }
    
}