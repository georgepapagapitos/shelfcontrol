const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const query = `SELECT "books".id, "books".title, "books".author, "books".isbn, "books".description, "books".book_cover_image, "books".info_page, "books".quantity, "genres".genre_name, "reading_grade_levels".reading_grade_level 
                  FROM "books" 
                  JOIN "genres" ON "books".genre_id="genres".id 
                  JOIN "reading_grade_levels" ON "reading_grade_levels".id="books".reading_grade_level_id 
                  ORDER BY "books".title ASC;`;
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
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
                  RETURNING "id";`;
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
      console.log('Error in DELETE /book/id');
    })
})

router.put('/decrease', (req, res) => {
  const bookId = req.body.bookId;
  console.log('book id to decrease quantity:', bookId);
  const query = 'UPDATE "books" SET "quantity" = "quantity" - 1 WHERE "id"=$1;';
  pool.query(query, [bookId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('error in PUT /book/id', err);
    })
})

router.put('/increase', (req, res) => {
  const bookId = req.body.bookId;
  console.log('book id to increase quantity:', bookId);
  const query = 'UPDATE "books" SET "quantity" = "quantity" + 1 WHERE "id"=$1;';
  pool.query(query, [bookId])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('error in PUT /book/increase')
    })
})

module.exports = router;