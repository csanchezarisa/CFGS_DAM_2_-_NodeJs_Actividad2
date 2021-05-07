const mongoose = require('mongoose');

const cartaSchema = mongoose.Schema({
    nino: {
        type: mongoose.ObjectId,
        required: [true, "El niño es obligatório"],
        ref: 'ninos'
    },
    paje: {
        type: mongoose.ObjectId,
        required: [true, "El paje es obligatório"],
        ref: 'pajes'
    },
    peticiones: {
        type: [mongoose.ObjectId],
        required: [true, "Las peticiones son obligatórias"],
        ref: 'juguetes'
    },
    aceptada: {
        type: Boolean,
        required: [true, "La propiedad aceptada es obligatória"]
    }
});

const Carta = mongoose.model("cartas", cartaSchema);

module.exports = Carta;