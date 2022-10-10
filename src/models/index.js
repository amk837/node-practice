const {Sequelize} = require('sequelize');
const {dbOptions} = require('../config');

const {
	name, username, password, host, dialect
} = dbOptions;

const sequelize = new Sequelize(name, username, password, {
	host,
	dialect
});

const db = {};

db.sequelize = sequelize;

exports.db = db;
