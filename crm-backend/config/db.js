const mongoose = require('mongoose');
require('dotenv').config(); // Carica le variabili d'ambiente

const dbURI = process.env.MONGODB_URI;

const connect = () => {
  mongoose.connect(dbURI)
    .then(() => console.log('Connesso a MongoDB'))
    .catch((error) => console.error('Errore di connessione a MongoDB:', error));
};

module.exports = { connect };
