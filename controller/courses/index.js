const {db} = require('./db');
const {local} = require('./local');

exports.courses = {
	local,
	db
};
