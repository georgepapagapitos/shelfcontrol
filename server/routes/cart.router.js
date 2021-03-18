const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  // const userId = req.user.id;
  // const query = 'SELECT "books".id, "books".title, "books".isbn, "books".author FROM "orders" JOIN "orders_books" ON "orders_books".order_id="orders".id JOIN "books" ON "books".id="orders_books".book_id WHERE "user_id"=$1 GROUP BY "orders".user_id;';
  // pool.query(query, [userId])
  //   .then(result => {
  //     res.send(result.rows)
  //   })
  //   .catch(err => {
  //     console.log('error in GET /cart', err)
  //     res.sendStatus(500);
  //   })
})

router.post('/', (req, res) => {
  const userId = req.user.id;
  const date = req.body.date;
  const query1 = `INSERT INTO "orders" ("user_id", "order_date") VALUES ($1, $2) RETURNING "id";`;
  pool.query(query1, [userId, date])
    .then((result) => {
      const book = req.body.book;
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

router.delete('/', (req, res) => {
  const userId = req.user.id;
  const query = 'DELETE FROM "orders_books" WHERE "book_id"=$1;';
  pool.query(query, [userId])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('error in DELETE /cart', err)
    })
})

module.exports = router;