import nodemailer from 'nodemailer'

type sendLoginEmailParameters = {
  email: string
  url: string
  token: string
}

export async function sendLoginEmail({email, url, token,}: sendLoginEmailParameters) {
  const transporter = nodemailer.createTransport({
    service: 'SendPulse',
    auth: {
      user: process.env.DUMMY_SENDPULSE_USER,
      pass: process.env.DUMMY_SENDPULSE_PASS
    }
  });

  const info = await transporter.sendMail({
    from: '"PogaDevWeb" <pogadev18@gmail.com>',
    to: email,
    subject: 'Login to your account',
    html: `Login by clicking <a href="${url}/login#token=${token}">HERE</a>`,
  })

  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
}