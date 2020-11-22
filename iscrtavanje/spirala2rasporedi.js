function generisiRasporede() {
    let okvir = document.getElementById("okvir");
    iscrtajRaspored(okvir, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], 08, 21);
    dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
    //dodajAktivnost(okvir, "WT", "vježbe", 12, 13.5, "Ponedjeljak");
    //dodajAktivnost(okvir, "RMA", "predavanje", 14, 17, "Ponedjeljak");
    //dodajAktivnost(okvir, "RMA", "vježbe", 12.5, 14, "Utorak");
    //dodajAktivnost(okvir, "DM", "tutorijal", 14, 16, "Utorak");
    //dodajAktivnost(okvir, "DM", "predavanje", 16, 19, "Utorak");
    //dodajAktivnost(okvir, "OI", "predavanje", 12, 15, "Ponedjeljak");
    let okvir1 = document.getElementById("okvir1");
    iscrtajRaspored(okvir1, ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak"], -08, 21);
    // nevalidna dodavanja aktivnosti
    //dodajAktivnost(okvir1, "RMA", "vježbe", 12.5, 14, "Utorak");
    //dodajAktivnost(okvir, "RMA", "vježbe", 12.5, 14, "Utorak");
    //dodajAktivnost(okvir, "RMA", "vježbe", 12.5, 14, "U");
    //dodajAktivnost(okvir, "RMA", "vježbe", 12.05, 14, "Utorak");
    //dodajAktivnost(okvir, "RMA", "vježbe", 15, 14, "U");
}