const Sequelize = require('sequelize');
const predmet = require('./modeli/predmet');
const { setMaxListeners } = require('./skripta');
const sequelize = new Sequelize('mysql://root:root@localhost:3306/wt2018232');

const baza = {};

baza.sequelize = sequelize;
baza.Sequelize = Sequelize;

const Aktivnost = require('./modeli/aktivnost.js')(sequelize);
baza.Aktivnost = Aktivnost;
const Dan = require('./modeli/dan.js')(sequelize);
baza.Dan = Dan;
const Grupa = require('./modeli/grupa.js')(sequelize);
baza.Grupa = Grupa;
const Predmet = require('./modeli/predmet.js')(sequelize);
baza.Predmet = Predmet;
const Student = require('./modeli/student.js')(sequelize);
baza.Student = Student;
const Tip = require('./modeli/tip.js')(sequelize);
baza.Tip = Tip;

// relacije
// Predmet 1 - N Grupa
baza.Predmet.hasMany(baza.Grupa, {as: "grupePredmeta"});

// Aktivnost N - 1 Predmet
baza.Predmet.hasMany(baza.Aktivnost, {as: "aktivnostiPredmeta"});

// Aktivnost N - 0 Grupa
baza.Grupa.hasMany(baza.Aktivnost, {as: "aktivnostiGrupe"});

// Aktivnost N - 1 Dan
baza.Dan.hasMany(baza.Aktivnost, {as: "aktivnostiDana"});

// Aktivnost N - 1 Tip
baza.Tip.hasMany(baza.Aktivnost, {as: "tipoviAktivnosti"});

// Student N - M Grupa
baza.StudentskeGrupe = baza.Student.belongsToMany(baza.Grupa, {as: "grupe", through:'StudentskeGrupe'});
baza.Grupa.belongsToMany(baza.Student, {as: "studenti", through:'StudentskeGrupe'});

module.exports = baza;