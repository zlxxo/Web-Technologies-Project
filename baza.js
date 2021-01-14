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

// relacije
// Predmet 1 - N Grupa
baza.Predmet.hasMany(baza.Grupa, {foreignKey: {allowNull: false}});
baza.Grupa.belongsTo(baza.Predmet);

// Aktivnost N - 1 Predmet
baza.Aktivnost.belongsTo(baza.Predmet);
baza.Predmet.hasMany(baza.Aktivnost, {foreignKey: {allowNull: false}});

// Aktivnost N - 0 Grupa
baza.Aktivnost.belongsTo(baza.Grupa);
baza.Grupa.hasMany(baza.Aktivnost, {foreignKey: {allowNull: true}});

// Aktivnost N - 1 Dan
baza.Aktivnost.belongsTo(baza.Dan);
baza.Dan.hasMany(baza.Aktivnost, {foreignKey: {allowNull: false}});

// Aktivnost N - 1 Tip
baza.Aktivnost.belongsTo(baza.Tip);
baza.Tip.hasMany(baza.Aktivnost, {foreignKey: {allowNull: false}});

// Student N - M Grupa
baza.StudentskeGrupe = baza.Student.belongsToMany(baza.Grupa, {through:'StudentskeGrupe'});
baza.Grupa.belongsToMany(baza.Student, {through:'StudentskeGrupe'});

module.exports = baza;