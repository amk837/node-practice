const {port} = require('./src/config');
const app = require('./src/middlewares');

app.listen(port, () => {
	console.log(`server running on localhost:${port}`);
});
