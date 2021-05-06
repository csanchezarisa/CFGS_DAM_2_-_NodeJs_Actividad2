const mongoose = require('mongoose');

const cartaSchema = mongoose.Schema({
    nino: {
        type: mongoose.ObjectId,
        required: [true, "El niño es obligatório"]
    },
    paje: {
        type: mongoose.ObjectId,
        required: [true, "El paje es obligatório"]
    },
    peticiones: {
        type: [mongoose.ObjectId],
        required: [true, "Las peticiones son obligatórias"]
    },
    aceptada: {
        type: Boolean,
        required: [true, "La propiedad aceptada es obligatória"]
    }
});

const Carta = mongoose.model("cartas", cartaSchema);

module.exports = Carta;