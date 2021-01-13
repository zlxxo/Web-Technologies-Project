const Sequelize = require('sequelize');
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

module.exports = baza;