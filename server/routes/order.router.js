const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  const userId = req.user.id;
  const query = 'SELECT "id", "user_id", "is_active" FROM "orders" WHERE "user_id"=$1;';
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