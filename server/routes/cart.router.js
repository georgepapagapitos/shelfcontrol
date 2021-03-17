const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
  const userId = req.user.id;
  console.log(req.body);
  const query = 'INSERT INTO "orders" ("user_id", "order_date") VALUES ($1, $2);';
  pool.query(query, [userId, new Date()])
    .then(result => {
      console.log('added to cart');
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('error in POST /cart', err);
    })

})

module.exports = router;