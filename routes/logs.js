var express = require('express');
var router = express.Router();

router.post('/', async function(req, res, next) {
    try {
        console.log(req.query);
        console.log(req.body);
        if (global['logs']) {
            if(global['logs'].length >= 30)
                global['logs'].shift();
            global['logs'].push(req.body);
        }
        else
        {
            global['logs'] = [req.body];
        }
        res.send("Data saved");
    } catch (err) {
        console.log(err);
        res.json({ error: err.message || err.toString(), details: err.toString() });
    }
});

router.get('/', async function(req, res, next) {
    console.log(global['logs']);
    global['logs']?.reverse();
    res.send(global['logs']);
    global['logs']?.reverse();
});

module.exports = router;