import nodemailer from "nodemailer";
import * as crypto from "crypto";
import { EmailStandBy } from "./db.js";

const transport = nodemailer.createTransport({
    host: "mail.gmx.com",
    port: 587,
    secure: false,
    tls: {
        ciphers:'SSLv3',
        rejectUnauthorized: false
    },
    auth: {
        user: "morales.quentin@gmx.fr",
        pass: "GM//Second1Red6!"
    }
})

const sendConfirm = async (mail) => {
    const key = crypto.randomBytes(24).toString('base64');
    const inset = EmailStandBy.create({ key:key , email:mail })
    const info = await transport.sendMail({
        from: '"Igor Service" <morales.quentin@gmx.fr>',
        to: mail,
        subject: "Confirmation du mail",
        html: `<p>confirmé votre mail <a href="http://localhost:3000/mailConfirmation/${key}">ici</a></p>`
    });
    console.log("Message envoyer:", info.messageId);


}

export { sendConfirm }