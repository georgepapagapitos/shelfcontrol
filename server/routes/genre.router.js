const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const query = `SELECT * FROM "genres";`;
  pool
    .query(query)
    .then(response => {
      res.send(response.rows);
    })
    .catch(err => {
      console.log('Error getting genres', err);
      res.sendStatus(500);
    });
});

module.exports = router;