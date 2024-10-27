import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

export const sendEmail = (email:string,code:string)=>{
    const option = {
        from:process.env.USER,
        to:email,
        subject:"Email verification code",
        text:`Your verification code is ${code}`,
    }

    return transport.sendMail(option)
}