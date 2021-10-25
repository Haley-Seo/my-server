const express = require('express');

const router = express.Router();

router.get('/get-auction', (req, res, next) => {
  res.send(
    'aaa'
  );
});

// router.post('/product', (req, res, next) => {
//   console.log(req.body);
//   res.redirect('/');
// });

module.exports = router;
