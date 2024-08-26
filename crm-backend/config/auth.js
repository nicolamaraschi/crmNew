require('dotenv').config(); // Carica le variabili d'ambiente

module.exports = {
  dbURI: process.env.MONGODB_URI,  // Usa la variabile d'ambiente per l'URI
  jwtSecret: process.env.JWT_SECRET
};
