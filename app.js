const express = require('express');
const {port} = require('./src/config');
const {setUpMiddlewares} = require('./src/middlewares');
const {db} = require('./src/models');

const app = express();

setUpMiddlewares(app);

db.sync({alter: true});

app.listen(port, () => {
	console.log(`server running on localhost:${port}`);
});
