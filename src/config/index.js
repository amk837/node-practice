const convict = require('convict');

const config = convict({
	env: {
		doc: 'The application environment.',
		format: ['production', 'development'],
		default: 'development',
		env: 'NODE_ENV'
	},
	port: {
		doc: 'The port to bind.',
		format: 'port',
		default: 8080,
		env: 'PORT',
		arg: 'port'
	},
	name: {
		doc: 'Database name',
		format: String,
		default: 'mydb'
	},
	type: {
		doc: 'Database type/dialect',
		format: String,
		default: 'mysql'
	},
	user: {
		doc: 'Database user',
		format: String,
		default: 'root'
	},
	password: {
		doc: 'Database user password',
		format: String,
		default: '1234'
	}
});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile(`./src/config/${env}.json`);

module.exports = {
	env: config.get('env'),
	port: config.get('port'),
	dbOptions: {
		name: config.get('name'),
		dialect: config.get('type'),
		username: config.get('user'),
		password: config.get('password')
	}
};
