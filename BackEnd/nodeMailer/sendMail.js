import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodeMailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    }
)

export const sendMail = async (to, sub, msg, replyTo) => {
    try {
        transporter.sendMail({
            from:`"Portfolio Contact" <${process.env.USER_EMAIL}>`,
            to: to,
            subject: sub,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>From: </strong>${replyTo}</p>
                <p>${msg}</p>
            `,
            replyTo:replyTo
        })
        return true;
    } catch (error) {
        return false;
        console.error("Error sending email: ", error);
    }
}

