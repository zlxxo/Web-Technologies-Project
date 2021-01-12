const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@localhost:3306/wt2018232');
module.exports = sequelize;