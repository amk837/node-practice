const {Sequelize} = require('sequelize');
const {dbOptions} = require('../config');

const {
	name, username, password, host, dialect
} = dbOptions;

exports.db = new Sequelize(name, username, password, {
	host,
	dialect,
	logging: false
});
