const { Pool } = require('pg');

const pool = new Pool({
  user: 'biochar_admin',
  host: 'biocharlife.c3i8egwa493g.ap-southeast-1.rds.amazonaws.com',
  database: 'BiocharLife_INT',
  password: 'BioAd11Jun2024',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
