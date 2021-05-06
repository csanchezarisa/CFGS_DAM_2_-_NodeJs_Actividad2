const mongoose = require('mongoose');

const pajeSchema = mongoose.Schema({
    usuario: {
        type: String,
        required: [true, "El usuario de usuario es obligatório"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatória"]
    },
    nombre: {
        type: String,
        required: [true, "El nombre es obligatório"]
    },
    apellidos: {
        type: String,
        required: [true, "Los apellidos son obligatórios"]
    }
});

const Paje = mongoose.model("pajes", pajeSchema);

module.exports = Paje;