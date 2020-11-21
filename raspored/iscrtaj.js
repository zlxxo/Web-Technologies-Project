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
                        if(kolona%2 === 1 && ((sat <= 12 && sat%2 === 0) || (sat > 13 && sat%2 === 1))) {
                            kod += "<td class='vrijeme' colspan='2'>" + sat + ":00</td>\n";
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
                                kod += "<td class='sat pola prije-19'></td>\n";
                            } else {
                                kod += "<td class='sat pola'></td>\n";
                            }
                        } else {
                            if(sat === 19) {
                                kod += "<td class='sat cijeli poslije-19'></td>\n";
                            } else {
                                kod += "<td class='sat cijeli'></td>\n";
                            }
                        }
                    }
                }
                pola = !pola;
                if(kolona%2 === 0) {
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

}