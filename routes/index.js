var express = require('express');
var router = express.Router();
var axios = require('axios').default;

/* GET home page. */
router.get('/lphash.txt', function(req, res, next) {
  res.send('af35d1e9-135e-4816-a9f0-e9e366158454');
});

router.get('/', async function(req, res, next) {

  console.log(req.query)
  //response_type=code
  //req.query.code
  //client_secret = fb7c8d511e28a097010831f1a5f31873
  //client_id = c1636718016207e78b3ac7f7c170c0405cea39c74818

  //send to https://launchpad.classlink.com/oauth2/v2/token in post
  var dataFull = {
    client_id: "c1636718016207e78b3ac7f7c170c0405cea39c74818",
    client_secret: "fb7c8d511e28a097010831f1a5f31873",
    code: req.query.code,
};

  const params = new URLSearchParams()
  params.append('client_id', "c1636718016207e78b3ac7f7c170c0405cea39c74818")
  params.append('client_secret', "fb7c8d511e28a097010831f1a5f31873")
  params.append('code',req.query.code)
  url = "https://launchpad.classlink.com/oauth2/v2/token"
  await axios.post(url, params)
        .then(async function (response) {
            console.log({"responseUrl" : response.request?.res?.responseUrl});
            console.log({"responseData" : response.data});
            //response.data.id_token

            //response.data.access_token
            //https://nodeapi.classlink.com/v2/my/info GET with bearer
            const config = {
                headers: { Authorization: `Bearer ${response.data.access_token}` }
            };
            await axios.get("https://nodeapi.classlink.com/v2/my/info", config).then(
              function (response) {
              console.log({"responseUrl" : response.request?.res?.responseUrl});
              console.log({"responseData" : response.data});
              res.status(200).send({"url" : response.data});
            }).catch(function (error) {
              console.log("Error recived: ");
              var message = error?.response?.data || error;
              console.log(message);
              res.status(500).send({ httpError: message});
            });
        })
        .catch(function (error) {
            console.log("Error recived: ");
            var message = error?.response?.data || error;
            console.log(message);
            res.status(500).send({ httpError: message});
        });
});

module.exports = router;
