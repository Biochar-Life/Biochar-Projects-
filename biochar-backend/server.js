// server.js
const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const pool = require('./db'); // Import the PostgreSQL connection

const app = express();
const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID"); // Replace with your Google Client ID

app.use(express.json());

app.post('/api/check-google-email', async (req, res) => {
  const { token } = req.body;

  try {
    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "YOUR_GOOGLE_CLIENT_ID", // Replace with your Google Client ID
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    // Query the database to check if email exists in the people table
    const query = 'SELECT * FROM people WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rows.length > 0) {
      // Email exists in people table
      res.json({ exists: true });
    } else {
      // Email does not exist
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error verifying Google token or querying database', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
