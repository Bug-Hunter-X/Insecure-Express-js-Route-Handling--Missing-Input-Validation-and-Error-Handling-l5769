const express = require('express');
const app = express();
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  // Missing error handling for invalid userId
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      //This will not handle any type error or error from the database
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else if (results.length === 0) {
      // Instead of sending an error, it should handle this case efficiently
      res.status(404).send('User not found');
    } else {
      res.json(results[0]);
    }
  });
});
app.listen(3000, () => console.log('Server listening on port 3000'));