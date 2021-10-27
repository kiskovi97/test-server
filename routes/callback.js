var express = require('express');
var router = express.Router();

var jwt = require("jsonwebtoken");
var axios = require('axios').default;

var myJSONString = {
    "p": "xtxHvr0QO7RxJTZO4cNy0FSChMWTdeN12onPraVEgwmegF77MFfOLY9XVS0mkEilCU-XMzdzzrxUW-DUf-mFEaQCaxDC8_wdJvXnQLLfnUIkdwn0L_PF0EK_hf3YkLEKRO6viCKqsLeCVo3OtVqM9L2IvQqMGgC2AJM9XwgDc8c",
    "kty": "RSA",
    "q": "raXFpyoOTilY7F68PJUctANspO1GjiXjY_zX8LIGwZR930LMQ2QcmXYnz5rwn90h2mDUGSsTyozFVxiFIf-HkR7iDfLbDhibFtM842dtwQsAWQ9-etMRnd5mqBR0jpgowhKRzff9j2-hhUIb-c8K-MsND7x8107SHccZHje-DGk",
    "d": "aqaGiodECq8C4ltYmwrumwh08oah74XO330l3Ekpv1jYEMzqpHDSy3L0PjPFoID_5s9u3bJJVYOWeMPyWXS_tWLPrXxaZpOldgsBp-VzRN4KuGvudURpddSXszI_iYMfYqhAzbKlpqnoDoHyE-9k_KLvsfAxPPNdsZwTDD4Ff0-zqgQuPs0P7v8Hathzk_bpdyNy7-lTpjURSpKk1S48AZkAVyA7tEejgEjXPUbBDQcowPmgGbMLh-52U65cOdqFzdkz7esemtZuFJvc5pa935mVb9Gl54GH61lkWOCy9bZ7Zh2qqZcO6RE6KRyK72CLmIGW0Rle8QOj_tyiTLBd8Q",
    "e": "AQAB",
    "kid": "2020-05-18T22:33:20Z",
    "qi": "kQmKod740MJPhcwGjcUcES1eO5iN1aYGw4hPJu3AhRyrcnoj16toKQsSTxkmhAP1ncdwAySsBoabZGzwRAWfuGrCzUxERmoPTXszzcah77SwztX88MYihXpSMhUE7EgkYle5oCOxfZ-i2lToyA0tJiWM2y2XvRaW1mgnyGwW2xw",
    "dp": "UoJjYkify6X6rC30XMfzg20NGnm_zVIrPBmiCbJg0t3S3gCKyGwmJ9EpszWgoo0BrPNREPcZHdYWSmjmwovpooAiYLn7qbAZiGjPIpEVJvKinqGKp7rFgLuxK68_hAlw8Vj3i8yWdewuMCt2cNi5U3KwoX8W0lMpMOPmut9gT1E",
    "alg": "RS256",
    "dq": "lE8vf1S2Hx_FaSyIjR22BDGgi0R0rFfD3NRJArSqfI986kC9ARnyK0f1PKVSutc9YKyuukhGgQq2SWsR2jXK7bF41P0FBwcQ_u-v43GlFel1hJttJS48r58SAqBl5Jwkw4zkpwwVrnpjc9NA3Z1t-4xBPZ146tPRNcmktGBbm3E",
    "n": "huOh_4FHqUKy9dGfqbKcYBjmW-FzUO2wCkGqWW1tLowKGz8fHebolqc7sQMOq2rb-mdzoxrvgLfsavF-0FW7kLvDO9gPjBtZwHpTCzSbXAC6qbLBWJT1ZN6lBTO5r6bMpxWuWAG3T_-tb-B2hWjgMsmfOHvX7bkoLPyZaa_OG6D5AUI1PTkkQZJaKDCGXpSc2nc-Tp2pMGB6w2cCVw1hONnjsjQ8PYgnocFdATFCsWfDv-yXNvmrlwBnvIWHLHIn2rIWuWWZum7SGoKlDRMoPA6XQuihEcka3gUIa-qjYZKkBU6FdvViMsA3Lsq8Bux1hSH3p3sqlRnr7FEcIYnQnw"
};

const njwk = require('node-jwk');

const myKey = njwk.JWK.fromObject(myJSONString);

/* GET users listing. */
router.get('/', async function(req, res, next) {
    try {
        console.log(req.query);
        if (!req.query.nonce){
            res.status(500).send( { error: "nonce is missing"});
            return
        }

        var dataFull = `{
            "email": "gergely.richter@bookrkids.hu",
            "name": "Ms Jane Marie Doe",
            "given_name": "Jane",
            "family_name": "Doe",
            "nonce": "` + req.query.nonce + `",
            "iss": "https://thebookclub.com/",
            "https://purl.imsglobal.org/spec/lti/claim/deployment_id" : "deploymentid01",
            "aud": ["clientid01"],
            "https://purl.imsglobal.org/spec/lti/claim/message_type": "LtiResourceLinkRequest",
            "https://purl.imsglobal.org/spec/lti/claim/target_link_uri" : "https://go.2belive.net/thebookclub",
            
            "https://purl.imsglobal.org/spec/lti/claim/version": "1.3.0",
            "https://purl.imsglobal.org/spec/lti/claim/roles": [
              "http://purl.imsglobal.org/vocab/lis/v2/institution/person#Student",
              "http://purl.imsglobal.org/vocab/lis/v2/membership#Learner",
              "http://purl.imsglobal.org/vocab/lis/v2/membership#Mentor"
            ],
        }`;

        
        var token = jwt.sign(dataFull, myKey.key.toPrivateKeyPEM(), { 
            keyid : myKey.kid,
            algorithm: myKey.alg
        });
        var url = 'https://api-prod-2belive.2belive.net/lti/callback?state=' + req.query.state;
        
        //,  { 'headers' : headers }
        console.log(url);        
        const params = new URLSearchParams()
        params.append('id_token', token)

        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const timeout = setTimeout(() => {
          source.cancel();
          // Timeout Logic
        },  30*1000);
        
        var headers = {
            'cookie' : "LEGACY_lti1p3_"+req.query.state+"="+req.query.state+"; lti1p3_"+req.query.state+"="+req.query.state+"; ",
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        
        var config = { headers : headers, cancelToken: source.token};


        await axios.post(url, params, config)
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