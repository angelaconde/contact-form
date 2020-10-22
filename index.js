const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const nodemailer = require('nodemailer');

let config = require('./config');
let gmailUser = config.gmailUser;
let gmailPass = config.gmailPass;

app.listen(3000, function () { });

app.post('/contact', (req, res) => {

    const smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: gmailUser,
            pass: gmailPass
        }
    })

    const mailOpts = {
        from: `${req.body.from_email}`,
        to: gmailUser,
        subject: 'Mensaje recibido',
        text: `${req.body.from_name} con email ${req.body.from_email} ha dejado el siguiente mensaje: ${req.body.message}`,
    }

    smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
            console.log(req.body.message);
            console.log(error);
        }
        else {
            console.log(`${req.body.from_name} con email ${req.body.from_email} ha dejado el siguiente mensaje: ${req.body.message}`);
        }
    })
})