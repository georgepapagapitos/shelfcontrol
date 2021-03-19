const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const userId = req.user.id;
  const query = 'SELECT "books".title, "books".book_cover_image, "books".id AS "book_id", "orders_books".order_id, "orders_books".date_completed, "orders".id, "orders".user_id, "orders".order_date, "orders".is_fulfilled, "orders".is_active FROM "books" JOIN "orders_books" ON "books".id="orders_books".book_id JOIN "orders" ON "orders_books".order_id="orders".id WHERE "orders".user_id=$1;';
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

module.exports = router;