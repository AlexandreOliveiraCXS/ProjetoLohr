import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "eu_xandi@hotmail.com",
        pass: "dsl-_500b"
    },
    tls: { rejectUnauthorized: true }
});

interface ParamsMail {
    addressee: string,
    subject: string,
    message: string,
}

function sendEmail(params: ParamsMail) {
    const mailOptions = {
        from: 'eu_xandi@hotmail.com',
        to: params.addressee,
        subject: params.subject,
        text: params.message
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Não enviado: " + error);
        } else {
            console.log('Email enviado:');
        }
    });
}

export default sendEmail;