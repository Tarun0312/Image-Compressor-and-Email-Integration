const nodemailer = require("nodemailer");
require("dotenv").config();

exports.transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST ,
    auth: {
        user: process.env.MAIL_USER ,
        pass: process.env.MAIL_PASSWORD ,
    },
});

exports.host = process.env.MAIL_HOST
exports.user = process.env.MAIL_USER
exports.pass = process.env.MAIL_PASSWORD
