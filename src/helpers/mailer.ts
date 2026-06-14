import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs';
// import { v4 as uuidv4 } from 'uuid';

export const sendEmail = async({email, emailType, userId}:any) =>{
    try {
        
        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        // const hashedToken = uuidv4();

        console.log(hashedToken);
        
        if(email==="VERIFY"){
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        }
        else if(email==="RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        const htmlContent = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
                
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "d6a138c77a7069", // ❌
                pass: "e7e4cfda858f86"  // ❌
            }
        });

        const mailOptions = {
            from: 'rishicodes@gmail.com', // sender address
            to: email, // list of recipients
            subject: emailType=== 'VERIFY' ? 'Verify your email': "Reset your password", // subject line
            html: htmlContent, // HTML body
        }

        const mailResponse = await transporter.sendMail(mailOptions);

        return mailResponse
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}