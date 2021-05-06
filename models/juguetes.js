const mongoose = require('mongoose');

const jugueteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatório'],
        match: [/[A-Z0-9-]{80}/, "El formato del nombre no es correcto"]
    },
    precio: {
        type: Number,
        required: [true, "El precio es obligatório"],
        validate: {
            validator: price => price >= 0,
            message: "El precio debe ser superior o igual a 0"
        }
    },
    peso: {
        type: Number,
        required: [true, "El peso es obligatório"],
        validate: {
            validator: peso => peso >= 0 && peso <= 20,
            message: "El peso debe oscilar entre 0 y 20"
        }
    },
    stock: {
        type: Number,
        default: 0,
        required: [true, "El stock es obligatório"],
        validate: {
            validator: stock => stock >= 0,
            message: "El stock debe ser superior o igual a 0"
        }
    }
});

const Juguete = mongoose.model("juguetes", jugueteSchema);

module.exports = Juguete;