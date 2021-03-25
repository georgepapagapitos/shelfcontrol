const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const query = `SELECT "books".title, "books".book_cover_image, "books".id AS "book_id", "orders_books".order_id, "orders_books".date_completed, "orders".id, "orders".user_id, "orders".order_date, "orders".is_fulfilled, "orders".is_active 
                  FROM "books" 
                  JOIN "orders_books" ON "books".id="orders_books".book_id 
                  JOIN "orders" ON "orders_books".order_id="orders".id 
                  WHERE "orders".user_id=$1
                  ORDER BY "orders".order_date DESC;`;
  pool.query(query, [userId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('error in GET /order', err);
      res.sendStatus(500);
    })
})

router.get('/all', rejectUnauthenticated, (req, res) => {
  const query = `SELECT "orders".id, "users".first_name, "users".last_name, "orders".is_fulfilled, "orders".order_date, JSON_AGG("books".title) AS "books"
                  FROM "users"
                  JOIN "orders" ON "users".id="orders".user_id
                  JOIN "orders_books" ON "orders".id="orders_books".order_id
                  JOIN "books" ON "orders_books".book_id="books".id
                  GROUP BY "orders".id, "users".first_name, "users".last_name
                  ORDER BY "orders".id DESC;`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('error in GET /order/all', err);
      res.sendStatus(500);
    })
})

router.get('/active', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  const query = `SELECT "orders".id FROM "orders" WHERE "orders".is_active=true AND "orders".user_id=$1;`;
  pool.query(query, [userId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('error in GET /order/active', err);
      res.sendStatus(500);
    })
})

router.put('/', rejectUnauthenticated, (req, res) => {
  const orderId = req.body.orderId;
  const query = 'UPDATE "orders" SET "is_fulfilled"=true WHERE "id"=$1;';
  pool.query(query, [orderId])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('error in PUT /order', err);
      res.sendStatus(500);
    })
})

router.put('/finish', rejectUnauthenticated, (req, res) => {
  const date = req.body.date;
  const bookId = req.body.order.book_id;
  const orderId = req.body.order.order_id;
  console.log(date, bookId, orderId)
  const query = `UPDATE "orders_books" SET "date_completed"=$1 WHERE "book_id"=$2 AND "order_id"=$3 RETURNING "date_completed";`;
  pool.query(query, [date, bookId, orderId])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('error in PUT /order/finish', err);
      res.sendStatus(500);
    })
})

module.exports = router;