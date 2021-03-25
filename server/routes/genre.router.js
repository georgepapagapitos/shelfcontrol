const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
  const query = `SELECT * FROM "genres" ORDER BY "genre_name" ASC;`;
  pool.query(query)
    .then(response => {
      res.send(response.rows);
    })
    .catch(err => {
      console.log('Error in GET genres', err);
      res.sendStatus(500);
    });
});

router.post('/', rejectUnauthenticated, (req, res) => {
  const genreToAdd = req.body.genreToAdd;
  console.log("genreToAdd", genreToAdd);
  const query = `INSERT INTO "genres" ("genre_name") VALUES ($1) RETURNING "id";`;
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