const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function isValidEmail(email) {
  return typeof email === 'string' && email.includes('@');
}

function isValidPassword(password) {
  return typeof password === 'string' && password.length >= 8;
}

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res.status(400).json({ success: false, message: 'Invalid email or password format.' });
  }

  const query =
    "SELECT * FROM users WHERE email = '" + email + "' AND password = '" + password + "'";

  console.log('[VULNERABLE QUERY]', query);

  try {
    const user = db.prepare(query).get();

    if (user) {
      return res.status(200).json({
        success: true,
        message: `Login successful. Welcome ${user.email} (role: ${user.role}).`
      });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'SQL error: ' + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Juice login form demo running at http://localhost:${PORT}`);
});
