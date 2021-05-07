const express = require('express');
const router = express.Router();
const Carta = require('../models/cartas');
const Nino = require('../models/ninos');

router.use((req, res, next) => {

    if (req.session.paje) {
        next();
    }
    else {
        req.reyes.error = 'Inicia sesión para poder ver este contenido';
        res.render('landingpage', req.reyes);
    }

});

router.get('/', (req, res) => {

    let filter = {
        paje: req.reyes.paje
    };

    Carta.find(filter).populate('nino').exec((err, documents) => {

        if (!err) {
            if (documents) {
                req.reyes.cartas = documents;
                res.render('cartas', req.reyes);
            }
            else {
                req.reyes.sinCartas = true;
                res.render('cartas', req.reyes);
            }
        }
        else {
            res.redirect('/');
        }

    });

});

module.exports = router;