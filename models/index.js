const {Sequelize} = require('sequelize');
const {dbOptions} = require('../config');

const {
	name, username, password, dialect
} = dbOptions;

exports.db = new Sequelize(name, username, password, {
	dialect,
	logging: false
});
