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

router.post('/', (req, res) => {
  const genreToAdd = req.body.genreToAdd;
  const query = `INSERT INTO "genres" ("genre_name") VALUES ($1)`
  pool.query(query, [genreToAdd])
    .then(result => {
      console.log('New genre id:', results.rows[0].id);
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('error in POST genre', err);
      res.sendStatus(500);
    })
})

module.exports = router;