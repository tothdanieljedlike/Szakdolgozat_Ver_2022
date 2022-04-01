import {createTransport} from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

const transporter = createTransport({
    host: process.env.SMTP_HOST || 'localhost',
    port: +process.env.SMTP_PORT || 465,
    secure: process.env.SMTP_SECURE !== 'false', // use TLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: process.env.SMTP_NO_SSL === 'true',
    },
});

transporter.verify();

export function sendEmail(data: Mail.Options) {
    return transporter.sendMail(data);
}
