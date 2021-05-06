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

app.use('/juguetes', juguetes);

app.get('/', (req, res) => {
    res.render('landingpage');
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
                res.redirect('/juguetes');
            }
            else {
                res.render('landingpage', {
                    error: "Datos de inicio de sesión incorrectos"
                })
            }

        }
        else {
            res.render('landingpage', {
                error: "Se ha producido un error"
            })
        }

    });
});

app.all('*', (req, res) => {
    res.render('error');
});

app.listen(3000);