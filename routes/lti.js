var express = require('express');
var router = express.Router();
var axios = require('axios').default;

router.post('/', async function(req, res, next) {
    try {
        console.log(req.query);
        var body = {
            client_id: "clientid01",
            iss: "https://kiskovi-test-server.herokuapp.com",
            login_hint: "hint_pipeline_" + Math.floor(Math.random() * 100),
        };
        var url = "https://api-prod-2belive.2belive.net/lti/login?company_id=312";
        var config = { headers: {"Content-Type" : "application/json","Accept": "application/json"} };

        console.log(req.body);
        global[body.login_hint] = req.body;

        await axios.post(url, body, config)
        .then(function (response) {
            console.log(response.data);
            res.status(200).send(response.data);
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