import nodemailer from 'nodemailer'

export function SendMail(
    to: string,
    subject: string,
    text: string,
    html: string
) {
    const companyData = {
        mail: process.env.EMAIL,
        password: process.env.EMAIL_PASS,
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: companyData.mail,
            pass: companyData.password,
        },
    })

    const mailOptions = {
        from: companyData.mail,
        to,
        subject,
        text,
        html,
    }

    transporter.sendMail(mailOptions)
}
