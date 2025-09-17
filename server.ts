import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import { MONGO_URI, EMAIL_SERVICE_USER, EMAIL_SERVICE_PASS,PORT } from './config.ts';

const app = express();
app.use(express.json());

//connect to MongoDB
mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Failed to connect to MongoDB", err);
});

const Message=mongoose.connection.collection('messages');

app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        await Message.insertOne({ name, email, message, date: new Date() });
        
        res.json({ ok: true });
    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ ok: false, error: "Failed to save message" });
    }
});

//----nodemailer setup
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:EMAIL_SERVICE_USER,
        pass:EMAIL_SERVICE_PASS
    },
});

//--cron job to send email every day at 11:59 PM
cron.schedule('59 23 * * *', async () => {
    try {
        const messages=await Message.find({}).toArray();
        if(messages.length===0) {
            console.log("No messages to send");
            return;
        }
        const content=messages.map(msg => `Name: ${msg.name}\nEmail: ${msg.email}\nMessage: ${msg.message}\n Date:${msg.date}\n\n`).join('---\n');

        await transporter.sendMail({
            from: EMAIL_SERVICE_USER,
            to: EMAIL_SERVICE_USER,
            subject: 'Daily Contact Messages',
            text: content
        });
    } catch (error) {
        console.error("Error sending email:", error);   
    }});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});