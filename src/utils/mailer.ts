import nodemailer from 'nodemailer'

type sendLoginEmailParameters = {
  email: string
  url: string
  token: string
}

export async function sendLoginEmail({email, url, token,}: sendLoginEmailParameters) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.ETHEREAL_USER,
      pass: process.env.ETHEREAL_PASS
    }
  });

  const info = await transporter.sendMail({
    from: '"PogaDevWeb" <pogade18@gmail.com>',
    to: email,
    subject: 'Login to your account',
    html: `Login by clicking <a href="${url}/login#token=${token}">HERE</a>`,
  })

  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
}