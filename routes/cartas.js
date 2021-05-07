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

router.get('/:carta', (req, res) => {

    Carta.findById(req.params.carta).populate('nino').populate('paje').populate('peticiones').exec((err, document) => {
        if (!err) {
            req.reyes.carta = document;
            res.render('carta', req.reyes);
        }
        else {
            res.redirect('/cartas');
        }
    });

});

router.post('/:carta', (req, res) => {

    if (req.body.aceptada === 'on') {
        var aceptada = true;
    }
    else {
        var aceptada = false;
    }

    let datosCarta = {
        aceptada: aceptada
    };

    Carta.findByIdAndUpdate(req.params.carta, datosCarta, {runValidators: true}, (err) => {
        if (!err) {
			res.redirect('/juguetes');
		} 
        else {
			
			datosCarta._id = req.params.carta;
			
			let errores = [];
			let campos = Object.keys(err.errors);

			for (let campo of campos) {
				errores.push(err.errors[campo].message);
			}

            req.reyes.carta = datosCarta;
            req.reyes.errores = errores;
			res.render('/carta/' + datosCarta._id, req.reyes);
		}
    });

});

module.exports = router;