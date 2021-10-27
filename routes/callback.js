var express = require('express');
var router = express.Router();

var jwt = require("jsonwebtoken");
var axios = require('axios').default;

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        console.log(req.query);
        if (!req.query.nonce){
            res.status(400).send( req.query.login_hint);
            return
        }

        var dataFull = `{
            "email": "gergely.richter@bookrkids.hu",
            "name": "Ms Jane Marie Doe",
            "given_name": "Jane",
            "family_name": "Doe",
            "nonce": "` + req.query.nonce + `",
            "iss": "https://thebookclub.com/",
            "aud": ["clientid01"]
        }`;

        var secret = "J821v0PKKqDjIZHesJIFRy24xJtypOzszXwcGLrC6e63PL7dppwO0ydgEcxZIrw2yQXfBD1GNpwamo9cPYIxTHgj81XW45Tcl2v-Y5xGPzLzBtBVXBAwhYQfPFDXKh31Q_UKbCG3Bn-H1sm6wW84I3gvpK-aQqnzCVgpjLSJ9A2TcT0BPpehBzFv7TOpjbHLgc6RnEVB9Uq7wrUZ03LCps-ULHdZ3jn-SaJrFJsnYWJ8LLQy0SGHNfyO9zGXYzbILJB9rE-qaKDW9UXj3pppdYh2lUH9S4lYVtQC4GVFWFsXDSwTQpAP8ESbbUh9e_RsKLQtCiD7RjDVmjXw7EfyuA";
        var token = jwt.sign(dataFull, secret, { 
            keyid : "2020-05-18T22:33:20Z",
            algorithm: 'HS256'
        });
        var url = 'https://api-prod-2belive.2belive.net/lti/callback?state=' + req.query.state;

        var headers = {'cookie' : "LEGACY_lti1p3_"+req.query.state+"="+req.query.state+"; "
        + "lti1p3_"+req.query.state+"="+req.query.state+"; "};
        //,  { 'headers' : headers }
        var body = {id_token: token};
        console.log(url);
        console.log(body);

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const timeout = setTimeout(() => {
          source.cancel();
          // Timeout Logic
        }, 5000);
        


        await axios.post(url, body, { headers : headers, cancelToken: source.token})
        .then(function (response) {
            console.log("response");
            res.status(200).send('Response is okay');
        })
        .catch(function (error) {
            console.log("Error recived: ");
            var message = error?.response?.data || error;
            console.log(message);
            res.status(500).send({ httpError: message});
        });
    } catch (err) {
        console.log(err);
        res.json({ error: err.message || err.toString(), details: err.toString() });
    }
});

module.exports = router;