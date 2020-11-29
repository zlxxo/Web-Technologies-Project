var GenerisiRasporede = (function() {

    var iscrtajRaspored = function(div, dani, satPocetak, satKraj) {
        function generisiID(div, dan, vrijeme) {
            let id = div.id + "-" + dan.toLowerCase() + "-";
            if(vrijeme - Number.parseInt(vrijeme) < 0.5) {
                id += vrijeme.toString();
            } else {
                id += "pola-" + (Number.parseInt(vrijeme) + 1).toString();
            }
            return id;
        };

        if(satPocetak >= satKraj || satPocetak < 0 || satPocetak > 24 || satKraj < 0 ||
            satKraj > 24 || !Number.isInteger(satPocetak) || !Number.isInteger(satKraj)) {
            div.innerHTML += "Greška";
            return;
        }
    
        let kod = "";
        kod += "<table>";
        for (let red = 0; red <= dani.length; red++) {
            var dan;
            let sat = satPocetak;
            if(red === 0) {
                kod += "<tr class='satnica'>";
            } else {
                kod += "<tr>";
                dan = dani[red - 1];
            }
            
            let pola = true;
            for (let kolona = 0; kolona <= (satKraj - satPocetak)*2; kolona++) {
                if(red === 0) {
                    if(kolona === 0) {
                        kod += "<td class='vrijeme' colspan='3'></td>";
                    } else if(pola) {
                        kod += "<td class='vrijeme' colspan='2'>";
                        if((sat <= 12 && sat%2 === 0) || (sat > 13 && sat < satKraj && sat%2 === 1)) {
                            let jednocifreni = "";
                            if(sat < 10) {
                                jednocifreni += "0"
                            }
                            kod += jednocifreni + sat + ":00";
                        }
                        kod += "</td>"; 
                    }
                        
                } else {
                    if(kolona === 0) {
                        if(red === 1) {
                            kod += "<td class='prvi dan' colspan='4'>" + dan + "</td>";
                        } else {
                            kod += "<td class='dan' colspan='4'>" + dan + "</td>";
                        }
                    } else {
                        kod += "<td id='";
                        if(pola) {
                            kod += generisiID(div, dan, sat + 0.5) + "' class='sat pola";
                            if(sat === 18) {
                                kod += " prije-19";
                            }
                        } else {
                            kod += generisiID(div, dan, sat) + "' class='sat cijeli";
                            if(sat === 19) {
                                kod += " poslije-19";
                            }
                        }
                        kod += "'></td>";
                    }
                }
                if(pola && kolona != 0) {
                    sat++;
                }
                pola = !pola;
            }
            kod += "</tr>";
        }
        kod += "</table>";
        div.innerHTML += kod;
    };

    var dodajAktivnost = function(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) {
        function generisiID(div, dan, vrijeme) {
            let id = div.id + "-" + dan.toLowerCase() + "-";
            if(vrijeme - Number.parseInt(vrijeme) < 0.5) {
                id += vrijeme.toString();
            } else {
                id += "pola-" + (Number.parseInt(vrijeme) + 1).toString();
            }
            return id;
        };

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
                let kod = "<div class='cas'><p class='predmet'>" + naziv + "</p><p class='tip'>" + tip + "</p></div>";
                polje.innerHTML += kod;
            } else {
                polje.parentNode.removeChild(polje);
            }
            i++;
        }
    };
    
    return {
        iscrtajRaspored: iscrtajRaspored,
        dodajAktivnost: dodajAktivnost
    };
}());

var okvir = document.getElementById("okvir");
var dani = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"];
GenerisiRasporede.iscrtajRaspored(okvir, dani, 08, 21);
GenerisiRasporede.dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
GenerisiRasporede.dodajAktivnost(okvir, "WT", "vježbe", 12, 13.5, "Ponedjeljak");
GenerisiRasporede.dodajAktivnost(okvir, "RMA", "predavanje", 14, 17, "Ponedjeljak");
GenerisiRasporede.dodajAktivnost(okvir, "RMA", "vježbe", 12.5, 14, "Utorak");
GenerisiRasporede.dodajAktivnost(okvir, "DM", "tutorijal", 14, 16, "Utorak");
GenerisiRasporede.dodajAktivnost(okvir, "DM", "predavanje", 16, 19, "Utorak");
GenerisiRasporede.dodajAktivnost(okvir, "OI", "predavanje", 12, 15, "Srijeda");
    
let okvir1 = document.getElementById("okvir1");
GenerisiRasporede.iscrtajRaspored(okvir1, dani, 12, 12);
GenerisiRasporede.dodajAktivnost(okvir1, "RMA", "vježbe", 12.5, 14, "Utorak");
GenerisiRasporede.dodajAktivnost(okvir, "RMA", "vježbe", 12.5, 14, "Utorak");
GenerisiRasporede.dodajAktivnost(okvir, "RMA", "vježbe", 12.5, 14, "U");
GenerisiRasporede.dodajAktivnost(okvir, "RMA", "vježbe", 12.05, 14, "Utorak");
GenerisiRasporede.dodajAktivnost(okvir, "RMA", "vježbe", 15, 14, "Cetvrtak");
GenerisiRasporede.dodajAktivnost(okvir, "RMA", "tutorijal", 11.5, 13.5, "Petak");