const express = require('express');
const router = express.Router();
const Juguete = require("../models/juguetes");

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

    let filter = {};
    let pagina = 1;
    let paginas = 0;
    let search = "";
    let orderby = "nombre";

    if (req.query.search) {
        search = req.query.search;
        let exp = new RegExp(req.query.search, 'i');
		filter.nombre = exp;
    }

    if (req.query.pagina) {
        pagina = req.query.pagina;
    }

    if (req.query.orderby) {
        orderby = req.query.orderby;
    }

    Juguete.find(filter, (err, documents) => {
        paginas = documents.length / 10;

        Juguete.find(filter).limit(10).skip((pagina - 1) * 10).sort(orderby).exec((err, documents) => {

            if (!err && documents.length > 0) {
                req.reyes.juguetes = documents
                req.reyes.pagina = pagina;
                req.reyes.paginas = Math.ceil(paginas);
                req.reyes.paginasArray = createPaginasArray(req.reyes.paginas);
                req.reyes.search = search;
                req.reyes.orderby = orderby;
                res.render('juguetes', req.reyes);
            }
            else {
                req.reyes.sinJuguetes = true;
                res.render('juguetes', req.reyes);
            }
        });

    });
});

function createPaginasArray(paginas) {
    let array = [];
    for (i = 1; i <= paginas; i++) {
        array.push(i);
    }
    return array;
}

router.post('/', (req, res) => {
    let nuevoJuguete = new Juguete({
        nombre: req.body.nombre,
        precio: req.body.precio,
        peso: req.body.peso,
        stock: req.body.stock
    })

    nuevoJuguete.save(err => {
        if (!err) {
            res.redirect('/juguetes');
        }
        else {
            let errores = [];
            let campos = Object.keys(err.errors);

            for (let campo of campos) {
                errores.push(err.errors[campo].message);
            }
            
            req.reyes.errores = errores;
            res.render('juguetecreate', req.reyes);
        }
    });
});

router.get('/create', (req, res) => {
    res.render('juguetecreate', req.reyes);
});

router.get('/:juguete/edit', (req, res) => {

    Juguete.findById(req.params.juguete, (err, document) => {
        if (!err) {
            req.reyes.juguete = document;
            res.render('jugueteedit', req.reyes);
        }
        else {
            res.redirect('/juguetes');
        }
    });

});

router.post('/:juguete', (req, res) => {
    let datosJuguete = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        peso: req.body.peso,
        stock: req.body.stock
    }

    Juguete.findByIdAndUpdate(req.params.juguete, datosJuguete, {runValidators: true}, err => {
        if (!err) {
			res.redirect('/juguetes');
		} 
        else {
			
			datosJuguete._id = req.params.id;
			
			let errores = [];
			let campos = Object.keys(err.errors);

			for (let campo of campos) {
				errores.push(err.errors[campo].message);
			}

            req.reyes.contacto = datosJuguete;
            req.reyes.errores = errores;
			res.render('jugueteedit', req.reyes);
			
		}
    });
});

router.get('/:juguete/delete', (req, res) => {
    Juguete.findByIdAndDelete(req.params.juguete, err => {
        if (err) {
            console.log("Ha habido un error eliminando el juguete");
        }
        res.redirect('/juguetes');
    });
});

module.exports = router;