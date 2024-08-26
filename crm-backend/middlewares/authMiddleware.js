const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

// Middleware per la verifica del token JWT
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'Token mancante' });
  }

  jwt.verify(token, authConfig.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token non valido' });
    }

    // Aggiungi il log dell'utente decodificato per il debugging
    console.log("Utente decodificato dal token:", user);

    req.user = user; // Allegare l'utente decodificato alla richiesta
    next(); // Passare al prossimo middleware/rotta
  });
};

// Middleware per la verifica dei permessi dell'utente
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accesso negato' });
    }
    next();
  };
};

// Middleware per la verifica se l'utente è amministratore
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accesso negato' });
  }
  next();
};
