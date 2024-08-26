const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
// Registrazione di un nuovo utente
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Verifica che tutti i campi richiesti siano presenti
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creazione di un nuovo utente
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ _id: user._id, role: user.role }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
