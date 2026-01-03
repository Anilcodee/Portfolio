import Contact from "../models/contactSchema.js";
import { sendMail } from "../nodeMailer/sendMail.js";

export const submitContactForm = async (req, res) => {
    try {
        const {email, subject, message} = req.body;
        if(!email || !subject || !message){
            return res.status(400).json({message: "All fields are required"}); 
        }

        const newContact = await Contact.create({
            email,
            subject,
            message
        });

        const resMail = sendMail(process.env.USER_EMAIL, subject, message, email);

        if(!resMail) {
            return res.status(500).json({message: "Failed to send email"});
        }

        return res.status(201).send({user: newContact});
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find()
        res.status(200).json({contacts})
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}