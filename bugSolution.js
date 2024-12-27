const express = require('express');
const { Pool } = require('pg'); // Using PostgreSQL for example
const app = express();
const pool = new Pool({
  // Your database connection details
});
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [parseInt(userId, 10)]); //Using parameterized query
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.listen(3000, () => console.log('Server listening on port 3000'));