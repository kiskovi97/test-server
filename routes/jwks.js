var express = require('express');
var router = express.Router();

var publickKey = {
    "kty": "RSA",
    "e": "AQAB",
    "kid": "2020-05-18T22:33:20Z",
    "alg": "RS256",
    "n": "huOh_4FHqUKy9dGfqbKcYBjmW-FzUO2wCkGqWW1tLowKGz8fHebolqc7sQMOq2rb-mdzoxrvgLfsavF-0FW7kLvDO9gPjBtZwHpTCzSbXAC6qbLBWJT1ZN6lBTO5r6bMpxWuWAG3T_-tb-B2hWjgMsmfOHvX7bkoLPyZaa_OG6D5AUI1PTkkQZJaKDCGXpSc2nc-Tp2pMGB6w2cCVw1hONnjsjQ8PYgnocFdATFCsWfDv-yXNvmrlwBnvIWHLHIn2rIWuWWZum7SGoKlDRMoPA6XQuihEcka3gUIa-qjYZKkBU6FdvViMsA3Lsq8Bux1hSH3p3sqlRnr7FEcIYnQnw"
}

/* GET webjks */
router.get('/', function(req, res, next) {
    res.send({keys: [publickKey]})});

module.exports = router;