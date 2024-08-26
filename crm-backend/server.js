const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const contactRoutes = require('./routes/contactRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');
const salesRoutes = require('./routes/salesRoutes');
const revenueRoutes = require('./routes/revenueRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');
const { authenticateToken } = require('./middlewares/authMiddleware');
const { connect } = require('./config/db'); // Importa il modulo di connessione al database
const debug = require('debug')('app:server');

const app = express();

// Connessione al database
connect(); // Avvia la connessione al database

// Middleware
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/companies', authenticateToken, companyRoutes);
app.use('/api/contacts', authenticateToken, contactRoutes);
app.use('/api/opportunities', authenticateToken, opportunityRoutes);
app.use('/api/sales', authenticateToken, salesRoutes);
app.use('/api/revenues', authenticateToken, revenueRoutes);
app.use('/api/dashboard', authenticateToken, dashboardRoutes);
app.use('/api/users', authenticateToken, userRoutes);

// Gestione degli errori
app.use((err, req, res, next) => {
  debug('Error:', err.stack);
  res.status(500).send('Qualcosa è andato storto!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  debug(`Server in ascolto sulla porta ${PORT}`);
});
