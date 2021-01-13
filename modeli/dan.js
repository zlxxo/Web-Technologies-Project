const Sequelize = require("sequelize");

module.exports = (sequelize) => {
    const Dan = sequelize.define('Dan', {
        naziv: Sequelize.STRING
    });
    return Dan;
}