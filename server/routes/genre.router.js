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
      console.log('Error in GET genres', err);
      res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
  const genreToAdd = req.body.genreToAdd;
  const query = `IF [NOT] EXISTS (SELECT 1 FROM "genres" WHERE "genre_name"=$1 BEGIN INSERT INTO "genres" ("genre_name") VALUES ($1) RETURNING "id";`;
  pool.query(query, [genreToAdd])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('error in POST genre', err);
      res.sendStatus(500);
    })
})

module.exports = router;