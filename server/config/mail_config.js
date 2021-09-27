const nodemailer = require('nodemailer')

const transporter = (data) => nodemailer.createTransport({
    host: `${data.host}`,
    port: data.port,
    secure: data.secure,
    auth: {
        user: data.username,
        pass: data.password
    },
    tls: {
        rejectUnauthorized: data.tls
    }
});

module.exports = transporter