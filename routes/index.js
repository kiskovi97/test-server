var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/lphash.txt', function(req, res, next) {
  res.send('af35d1e9-135e-4816-a9f0-e9e366158454');
});

router.get('/', function(req, res, next) {
  res.send('Welcome');
});

module.exports = router;
