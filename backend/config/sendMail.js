import nodemailer from 'nodemailer'
import dotenv from "dotenv"

dotenv.config()

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail =async (toString,otp)=>{
    console.log('Sending mail to:', toString, 'OTP:', otp);
    try {
        const info = await transporter.sendMail({
            from: process.env.USER_EMAIL ,
            to: toString,
            subject: "Reset Your Password",

            html:`<p>Your OTP for Password Reset is <b>${otp}</b>.It expires in 5 minutes.</p>`
        });
        console.log('Email sent successfully:', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}
export default sendMail