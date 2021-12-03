var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var axios = require('axios').default;

router.post('/', async function(req, res, next) {
    try {
        console.log(req.query);
        console.log(req.body);
        var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gergo.kovacs.ghostboy@gmail.com',
            pass: process.env.EmailPassword
        }
        });

        var mailOptions = {
        from: 'kiskovi97@gmail.com',
        to: 'kiskovi97@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });

        res.send("Email sent");
    } catch (err) {
        console.log(err);
        res.json({ error: err.message || err.toString(), details: err.toString() });
    }
});

module.exports = router;