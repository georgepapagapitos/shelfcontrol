const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const userId = req.user.id;
  const query = `SELECT "books".id, "books".title, "books".isbn, "books".author, "orders_books".order_id, "orders".user_id 
                  FROM "books"
                  JOIN "orders_books" ON "books".id="orders_books".book_id
                  JOIN "orders" ON "orders".id="orders_books".order_id
                  WHERE "orders".user_id=$1 
                  AND "orders".is_active=true;`;
  pool.query(query, [userId])
    .then(result => {
      res.send(result.rows)
    })
    .catch(err => {
      console.log('error in GET /cart', err)
      res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
  const activeOrderId = req.body.activeOrderId;
  const book = req.body.book;
  const query = `INSERT INTO "orders_books" ("order_id", "book_id") VALUES ($1, $2)`;
  pool.query(query, [activeOrderId, book.id])
    .then(result => {
      console.log('book added to existing cart', activeOrderId);
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('error in POST /cart', err);
      res.sendStatus(500);
    })
})

router.post('/new', (req, res) => {
  const userId = req.user.id;
  const query = 'INSERT INTO "orders" ("user_id") VALUES ($1) RETURNING "id";';
  pool.query(query, [userId])
    .then(result => {
      const orderId = result.rows[0].id;
      const book = req.body.book;
      const query2 = 'INSERT INTO "orders_books" ("order_id", "book_id") VALUES ($1, $2);';
      pool.query(query2, [orderId, book.id])
        .then(() => {
          console.log('added book to new cart', orderId);
          res.sendStatus(200);
        })
        .catch(err => {
          console.log('error in nested POST /cart/new', err);
          res.sendStatus(500);
        })
    })
    .catch(err => {
      console.log('error in POST /cart/new', err);
      res.sendStatus(500);
    })
})

router.delete('/:id', (req, res) => {
  const bookId = req.params.id;
  const query = 'DELETE FROM "orders_books" WHERE "book_id"=$1;';
  pool.query(query, [bookId])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('error in DELETE /cart', err)
    })
})

router.put('/', (req, res) => {
  console.log('in put', req.body);
  const date = req.body.date;
  const orderId = req.body.cart[0].order_id;
  console.log('orderid to checkout', orderId);
  const userId = req.user.id;
  const query = 'UPDATE "orders" SET "is_active"=false, "order_date"=$1 WHERE "id"=$2 AND "user_id"=$3;';
  pool.query(query, [date, orderId, userId])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('error in PUT /cart', err);
      res.sendStatus(500);
    })
})

module.exports = router;