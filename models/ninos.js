const mongoose = require('mongoose');

const ninoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatório"]
    },
    apellidos: {
        type: String,
        required: [true, "Los apellidos son obligatórios"]
    },
    fechaNacimiento: {
        type: Date,
        required: [true, "La fecha de nacimiento es obligatória"]
    },
    comportamiento: {
        type: String,
        required: [true, "El comportamiento es obligatório"]
    },
    poblacion: {
        type: String,
        required: [true, "La población es obligatória"]
    },
    pais: {
        type: String,
        required: [true, "El país es obligatório"]
    }
});

ninoSchema.virtual('nombreCompleto').get(function () {
    return this.nombre + ' ' + this.apellidos;
});
ninoSchema.virtual('edad').get(function () {
    let hoy = new Date;
    let nacimiento = new Date(this.fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    let m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad;
});

const Nino = mongoose.model("ninos", ninoSchema);

module.exports = Nino;