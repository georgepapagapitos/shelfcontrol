const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
  const bookTitle = req.body.title;
  const bookAuthor = req.body.author;
  const genreId = req.body.selectedGenre;
  const isbn = req.body.isbn;
  const description = req.body.description;
  const readingGradeLevelId = req.body.readingGradeLevel;
  const bookCoverImage = req.body.bookCoverImage;
  const query = `INSERT INTO "books" ("title", "author", "genre_id", "isbn", "description", "book_cover_image", "reading_grade_level_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "id";`;
  pool.query(query, [bookTitle, bookAuthor, genreId, isbn, description, bookCoverImage, readingGradeLevelId])
    .then(result => {
      console.log('New book ID:', result.rows[0].id);
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Error in POST /book', err);
      res.sendStatus(500);
    })
})

module.exports = router;