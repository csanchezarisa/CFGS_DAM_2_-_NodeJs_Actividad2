const express = require('express');
const router = express.Router();

router.use((req, res, next) => {

    if (req.session.paje) {
        next();
    }
    else {
        req.reyes.error = 'Inicia sesión para poder ver este contenido';
        res.render('landingpage', req.reyes);
    }

});

module.exports = router;