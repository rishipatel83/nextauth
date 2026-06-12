import nodemailer from 'nodemailer'


export const sendEmail = async({email, emailType, userId}:any) =>{
    try {
        //TODO: configure mail for usage

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