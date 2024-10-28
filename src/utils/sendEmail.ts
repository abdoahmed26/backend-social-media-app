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

export const sendEmail = (email:string,link:string,username:string)=>{
    const option = {
        from:process.env.USER,
        to:email,
        subject:"Email reset password",
        html:
        `<div>
            <h1>Hello ${username}</h1>
            <p>Click on <a href=${link}>the link</a> below to reset your password</p>
        </div>`
        ,
    }

    return transport.sendMail(option)
}