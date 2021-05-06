const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

mongoose.connect('mongodb://localhost/activitat2', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.set('view engine', 'pug');
app.set('views', './views');

app.use(session({
	secret: 'SECRETITO SECRETITO',
	resave: true,
	saveUninitialized: true
}));

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(3000);