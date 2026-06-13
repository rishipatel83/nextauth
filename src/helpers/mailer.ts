import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export const sendEmail = async({email, emailType, userId}:any) =>{
    try {
        
        // const hashedToken = await bcrypt.hash(userId.toString(), 10)
        const hashedToken = uuidv4();

        if(email==="VERIFY"){
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        }
        else if(email==="RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }
        
        const transporter = nodemailer.createTransport({
            host: "smtp.example.com",
            port: 587,
            secure: false, 
            // use STARTTLS (upgrade connection to TLS after connecting)
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = {
            from: 'rishicode@gmail.com', // sender address
            to: email, // list of recipients
            subject: emailType=== 'VERIFY' ? 'Verify your email': "Reset your password", // subject line
            html: "<b>Hello world?</b>", // HTML body
        }

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}