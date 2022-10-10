const extractErrorMessages = (errors = []) => errors.map(({message}) => message);

const isNullValidator = (key, value) => {
	if (value === null || value === undefined) {
		throw Error(`key "${key}" is required`);
	}
};

exports.modelUtils = {
	extractErrorMessages,
	isNullValidator
};