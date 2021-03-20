const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const userId = req.user.id;
  const query = `SELECT "books".title, "books".book_cover_image, "books".id AS "book_id", "orders_books".order_id, "orders_books".date_completed, "orders".id, "orders".user_id, "orders".order_date, "orders".is_fulfilled, "orders".is_active 
                  FROM "books" 
                  JOIN "orders_books" ON "books".id="orders_books".book_id 
                  JOIN "orders" ON "orders_books".order_id="orders".id 
                  WHERE "orders".user_id=$1;`;
  pool.query(query, [userId])
    .then(result => {
      console.log('order db results', result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('error in GET /order', err);
      res.sendStatus(500);
    })
})

router.get('/all', (req, res) => {
  const query = `SELECT "orders".id, "users".first_name, "users".last_name, "orders".is_fulfilled, JSON_AGG("books".title) AS "books"
                  FROM "users"
                  JOIN "orders" ON "users".id="orders".user_id
                  JOIN "orders_books" ON "orders".id="orders_books".order_id
                  JOIN "books" ON "orders_books".book_id="books".id
                  GROUP BY "orders".id, "users".first_name, "users".last_name;`;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('error in GET /order/all', err);
      res.sendStatus(500);
    })
})

router.get('/active', (req, res) => {
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

router.put('/', (req, res) => {
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

module.exports = router;