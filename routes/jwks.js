var express = require('express');
var router = express.Router();

/* GET webjks */
router.get('/', function(req, res, next) {
    res.send('{ "keys" : [ {'
        +'"kty": "oct",'
        +'"kid": "2020-05-18T22:33:20Z",'
        +'"k": "J821v0PKKqDjIZHesJIFRy24xJtypOzszXwcGLrC6e63PL7dppwO0ydgEcxZIrw2yQXfBD1GNpwamo9cPYIxTHgj81XW45Tcl2v-Y5xGPzLzBtBVXBAwhYQfPFDXKh31Q_UKbCG3Bn-H1sm6wW84I3gvpK-aQqnzCVgpjLSJ9A2TcT0BPpehBzFv7TOpjbHLgc6RnEVB9Uq7wrUZ03LCps-ULHdZ3jn-SaJrFJsnYWJ8LLQy0SGHNfyO9zGXYzbILJB9rE-qaKDW9UXj3pppdYh2lUH9S4lYVtQC4GVFWFsXDSwTQpAP8ESbbUh9e_RsKLQtCiD7RjDVmjXw7EfyuA",'
        +'"alg": "HS256"'
    +'} ] }')});

module.exports = router;