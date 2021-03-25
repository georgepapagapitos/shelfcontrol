const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/:id', (req, res) => {
  console.log('req', req.params.id)
  const bookId = req.params.id;
  const query = 'SELECT * FROM "books" WHERE "id"=$1;';
  pool.query(query, [bookId])
    .then(result => {
      console.log(result.rows[0]);
      res.send(result.rows[0]);
    })
    .catch(err => {
      console.log('error in GET /edit', err);
      res.sendStatus(500);
    })
})

module.exports = router;