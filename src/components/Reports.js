const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

// Use the provided database credentials
const pool = new Pool({
  user: 'biochar_admin',
  host: 'biocharlife.c3i8egwa493g.ap-southeast-1.rds.amazonaws.com',
  database: 'BiocharLife_INT',
  password: 'BioAd11Jun2024',
  port: 5432,  // The standard PostgreSQL port
});

// Route to fetch reports data
app.get('/reports', async (req, res) => {
  try {
    const totalBiocharProducedResult = await pool.query('SELECT SUM(co2) AS total_biochar_produced FROM equipment');
    const totalBiocharUsedResult = await pool.query('SELECT SUM(ch4) AS total_biochar_used FROM equipment');
    const grossSinkResult = await pool.query('SELECT SUM(co2) AS gross_sink FROM equipment');
    const netSinkResult = await pool.query('SELECT (SUM(co2) - SUM(ch4)) AS net_sink FROM equipment');
    
    const submissionHealthResult = await pool.query(`
      SELECT 
        SUM(CASE WHEN status = 'Received' THEN 1 ELSE 0 END) AS received,
        SUM(CASE WHEN status = 'Approved' THEN 1 ELSE 0 END) AS approved,
        SUM(CASE WHEN status = 'Under Review' THEN 1 ELSE 0 END) AS under_review,
        SUM(CASE WHEN status = 'Certified' THEN 1 ELSE 0 END) AS certified
      FROM BiochaActivities;
    `);

    const reportData = {
      total_biochar_produced: totalBiocharProducedResult.rows[0].total_biochar_produced || 0,
      total_biochar_used: totalBiocharUsedResult.rows[0].total_biochar_used || 0,
      gross_sink: grossSinkResult.rows[0].gross_sink || 0,
      net_sink: netSinkResult.rows[0].net_sink || 0,
      received: submissionHealthResult.rows[0].received || 0,
      approved: submissionHealthResult.rows[0].approved || 0,
      under_review: submissionHealthResult.rows[0].under_review || 0,
      certified: submissionHealthResult.rows[0].certified || 0
    };

    res.json(reportData);
  } catch (err) {
    console.error('Error fetching report data:', err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
