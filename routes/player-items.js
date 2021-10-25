const express = require('express');

const router = express.Router();

router.get('/get-player', (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});


module.exports = router;
