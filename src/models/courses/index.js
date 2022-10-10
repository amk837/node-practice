const {STRING, BIGINT} = require('sequelize');
const {db} = require('..');
const {modelUtils} = require('../../utils/models');

exports.coursesModel = db.sequelize.define('course', {
	name: {
		type: STRING,
		validate: {
			isValid: (value) => {
				modelUtils.isNullValidator('name', value);
				if (value.length < 3 || value.length > 100) {
					throw Error('name\'s length should in the range [3,100]');
				}
			}
		},
		allowNull: true
	},
	creditHours: {
		type: BIGINT,
		allowNull: true,
		validate: {
			isValid: (value) => {
				modelUtils.isNullValidator('creditHours', value);
				if (value < 1 || value > 4) {
					throw Error('creditHours must be in the range [1,4]');
				}
			}
		}
	}
});
