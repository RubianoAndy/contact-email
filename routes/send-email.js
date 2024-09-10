const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/send-email', (request, response) => {
    const { name, email, subject, message } = request.body;
    // const name = request.body.name;
    // const email = request.body.email;
    // const subject = request.body.subject;
    // const message = request.body.message;

    const filePath = path.join(__dirname, '../templates/email/contact-email.html');

    if (!name || !email || !subject || !message) {
        return response.status(400).json({ error: 'No se puede enviar mensaje, datos incompletos' });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // Cambia a true si usas port 465
        auth: {
            user: process.env.EMAIL_HOST_USER,
            pass: process.env.EMAIL_HOST_PASSWORD,
        },
    });

    fs.readFile(filePath, 'utf8', (err, htmlContent) => {
        if (err)
            return response.status(500).json({ error: 'Error al leer el archivo HTML' });

        const personalizedHtml = htmlContent
            .replace('{{name}}', name)
            .replace('{{email}}', email)
            .replace('{{message}}', message);

        const mailContent = {
            // from: `"${name}" <${email}>`,
            to: process.env.EMAIL_HOST_USER,
            subject: subject,
            html: personalizedHtml,
        };

        transporter.sendMail(mailContent, (error, info) => {
            if (error)
                return response.status(500).json({ error: 'Error al enviar el correo' });

            return response.status(200).json({ message: 'Correo enviado correctamente' });
        });
    });
});

module.exports = router;