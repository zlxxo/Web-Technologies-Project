var GenerisiRasporede = (function() {

    function iscrtajRaspored(div, dani, satPocetak, satKraj) {
        function generisiID(div, dan, vrijeme) {
            var id = div.id + "-" + dan.toLowerCase() + "-";
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
    
        var kod = "";
        kod += "<table>";
        for (var red = 0; red <= dani.length; red++) {
            var dan;
            var sat = satPocetak;
            if(red === 0) {
                kod += "<tr class='satnica'>";
            } else {
                kod += "<tr>";
                dan = dani[red - 1];
            }
            
            var pola = true;
            for (var kolona = 0; kolona <= (satKraj - satPocetak)*2; kolona++) {
                if(red === 0) {
                    if(kolona === 0) {
                        kod += "<td class='vrijeme' colspan='3'></td>";
                    } else if(pola) {
                        kod += "<td class='vrijeme' colspan='2'>";
                        if((sat <= 12 && sat%2 === 0) || (sat > 13 && sat < satKraj && sat%2 === 1)) {
                            var jednocifreni = "";
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
                        var vrijeme = sat;
                        if(pola) {
                            vrijeme += 0.5;
                            kod += generisiID(div, dan, vrijeme) + "' class='sat pola";
                            if(sat === 18) {
                                kod += " prije-19";
                            }
                        } else {
                            kod += generisiID(div, dan, vrijeme) + "' class='sat cijeli";
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

    function dodajAktivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan) {
        function generisiID(div, dan, vrijeme) {
            var id = div.id + "-" + dan.toLowerCase() + "-";
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
    
        var i = 0;
        for(var vrijeme = vrijemePocetak*2; vrijeme < vrijemeKraj*2; vrijeme++) {
            var id = generisiID(raspored, dan, vrijeme/2);
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
                var kod = "<div class='cas'><p class='predmet'>" + naziv + "</p><p class='tip'>" + tip + "</p></div>";
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