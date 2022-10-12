const on404 = (req, res, next) => {
	res.send('<h1>404 Page Not Found</h1>');
	next();
};
module.exports = on404;
