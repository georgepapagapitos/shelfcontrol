const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const query = `SELECT * FROM "books";`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in GET /book', err);
      res.sendStatus(500)
    })
})

router.post('/', (req, res) => {
  const bookTitle = req.body.title;
  const bookAuthor = req.body.author;
  const genreId = req.body.selectedGenre;
  const isbn = req.body.isbn;
  const description = req.body.description;
  const readingGradeLevelId = req.body.readingGradeLevel;
  const bookCoverImage = req.body.bookCoverImage;
  const infoPage = req.body.infoPage;
  const query = `INSERT INTO "books" ("title", "author", "genre_id", "isbn", "description", "book_cover_image", "reading_grade_level_id", "info_page")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING "id";`;
  pool.query(query, [bookTitle, bookAuthor, genreId, isbn, description, bookCoverImage, readingGradeLevelId, infoPage])
    .then(result => {
      console.log('New book ID:', result.rows[0].id);
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Error in POST /book', err);
      res.sendStatus(500);
    })
})

router.delete('/:id', (req, res) => {
  const bookId = req.params.id;
  console.log('book id to delete:', bookId);
  const query = 'DELETE FROM "books" WHERE "id"=$1;';
  pool.query(query, [bookId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('Error in DELETE /book');
    })
})

module.exports = router;