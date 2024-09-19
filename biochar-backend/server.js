const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');  // Import CORS
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

const pool = new Pool({
  user: 'biochar_admin',
  host: 'biocharlife.c3i8egwa493g.ap-southeast-1.rds.amazonaws.com',
  database: 'BiocharLife_INT',
  password: 'BioAd11Jun2024',
  port: 5432,
  ssl: {
    rejectUnauthorized: false  // Add this line for SSL
  }
});

app.get('/certificates', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM certificates');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

