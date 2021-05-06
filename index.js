const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const Paje = require('./models/pajes');

const app = express();

mongoose.connect('mongodb://localhost/activitat2', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const juguetes = require("./routes/juguetes");

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

app.use((req, res, next) => {

    req.reyes = {};

    if (req.session.paje) {
        req.reyes.paje = req.session.paje;
    }

    next();
});

app.use('/juguetes', juguetes);

app.get('/', (req, res) => {
    if (req.reyes.paje) {
        res.redirect('/juguetes');
    }
    else {
        res.render('landingpage', req.reyes);
    }
});

app.post('/login', (req, res) => {
    let filter = {
        usuario: req.body.username,
        password: req.body.pass
    };

    Paje.findOne(filter, (err, document) => {

        if (!err) {

            if (document) {
                req.session.paje = document._id;
                req.reyes.paje = document._id;
                res.redirect('/juguetes');
            }
            else {
                req.reyes.error = "Datos de inicio de sesión incorrectos";
                res.render('landingpage', req.reyes);
            }

        }
        else {
            req.reyes.error = "Se ha producido un error";
            res.render('landingpage', req.reyes);
        }

    });
});

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/');
});

app.all('*', (req, res) => {
    res.render('error', req.reyes);
});

app.listen(3000);