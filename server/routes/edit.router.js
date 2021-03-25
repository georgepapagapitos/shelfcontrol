const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/:id', (req, res) => {
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

router.put('/', (req, res) => {
  console.log('req.body', req.body);
  const bookId = req.body.id;
  const title = req.body.title;
  const author = req.body.author;
  const genre = req.body.genre;
  const readingGradeLevel = req.body.readingGradeLevel;
  const description = req.body.description;
  const query = 'UPDATE "books" SET "title"=$1, "author"=$2, "genre_id"=$3, "description"=$4, "reading_grade_level_id"=$5 WHERE "id"=$6;';
  pool.query(query, [title, author, genre, description, readingGradeLevel, bookId])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('error in PUT /edit', err);
      res.sendStatus(500);
    })
})

module.exports = router;