const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Admin email for notifications
    pass: process.env.EMAIL_PASS,
  },
});

// Route to check if an email exists in the people table
app.post('/api/check-email', async (req, res) => {
  const { email } = req.body;

  try {
    const query = 'SELECT * FROM people WHERE email = $1';
    const result = await pool.query(query, [email]);

    res.json({ exists: result.rows.length > 0 });
  } catch (error) {
    console.error('Error querying database', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to create a new account in the people table
app.post('/api/create-account', async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
    const checkEmailQuery = 'SELECT * FROM people WHERE email = $1';
    const result = await pool.query(checkEmailQuery, [email]);

    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const insertQuery = 'INSERT INTO people (first_name, last_name, email) VALUES ($1, $2, $3)';
    await pool.query(insertQuery, [firstName, lastName, email]);

    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error('Error creating account', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to check if a user exists or create a new user using Google sign-up
app.post('/api/check-or-create-user', async (req, res) => {
  const { email, firstName, lastName } = req.body;

  try {
    // Check if user already exists in the 'people' table
    const userExists = await pool.query('SELECT * FROM people WHERE email = $1', [email]);

    if (userExists.rows.length === 0) {
      // If user does not exist, create the new user
      await pool.query(
        'INSERT INTO people (first_name, last_name, email) VALUES ($1, $2, $3)',
        [firstName, lastName, email]
      );

      // Notify admins about the new account request
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: ['mona@biochar.life', 'emilyntabe@biochar.life'],
        subject: 'New Account Request',
        text: `A new account request has been made:\n
               Name: ${firstName} ${lastName}\n
               Email: ${email}`,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ success: true, message: 'User created and request sent to admin.' });
    }

    // If user already exists
    res.status(200).json({ success: true, message: 'User already exists.' });
  } catch (error) {
    console.error('Error checking or creating user:', error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});

// Route to fetch pending account requests for the admin dashboard
app.get('/api/pending-requests', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM people WHERE approved = false');
    res.json({ requests: result.rows });
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching requests.' });
  }
});

// Route to approve an account request and notify the user
app.post('/api/add-account', async (req, res) => {
  const { first_name, last_name, email, role, location_id } = req.body;

  try {
    // Mark the user as approved in the database
    await pool.query(
      'UPDATE people SET role = $1, location_id = $2, approved = true WHERE email = $3',
      [role, location_id, email]
    );

    // Notify the user that their account has been created
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Account is Ready!',
      text: `Dear ${firstName}, your account has been approved. You can now log in!`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Account approved and user notified.' });
  } catch (error) {
    console.error('Error approving account:', error);
    res.status(500).json({ success: false, message: 'Error approving account.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
