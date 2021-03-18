const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
  const userId = req.body.user.id;
  const date = req.body.date;
  const book = req.body.book;
  console.log('book', book)
  const query1 = `INSERT INTO "orders" ("user_id", "order_date") VALUES ($1, $2) RETURNING "id";`;
  pool.query(query1, [userId, date])
    .then((result) => {
      const query2 = 'INSERT INTO "orders_books" ("order_id", "book_id") VALUES ($1, $2);';
      pool.query(query2, [result.rows[0].id, book.id])
        .then(() => {
          res.sendStatus(201);
        })
        .catch(err => {
          console.log('error in nested POST /cart', err);
          res.sendStatus(500);
        })
    })
    .catch(err => {
      console.log('error in POST /cart', err);
      res.sendStatus(500);
    })
})

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  console.log('user id', req.params.id);
  const query = 'SELECT "books".id, "books".title FROM "orders" JOIN "orders_books" ON "orders_books".order_id="orders".id JOIN "books" ON "books".id="orders_books".book_id WHERE "user_id"=$1 GROUP BY "books".id;';
  pool.query(query, [userId])
    .then(result => {
      console.log('result.rows', result.rows)
      res.send(result.rows[0])
    })
    .catch(err => {
      console.log('error in get /cart/id', err)
      res.sendStatus(500);
    })
})

router.delete('/', (req, res) => {
  const userId = req.body;
  console.log('delete', req.body);
})

module.exports = router;