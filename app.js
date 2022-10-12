const express = require('express');
const {port} = require('./config');
const {setUpMiddlewares} = require('./middlewares');
const {db} = require('./models');

const app = express();

app.set('view engine', 'ejs');

setUpMiddlewares(app);

db.sync({alter: true});

app.listen(port, () => {
	console.log(`server running on localhost:${port}`);
});
