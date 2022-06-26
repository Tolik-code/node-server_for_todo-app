import { normilize } from "./todos.js";
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: process.env.SMPT_HOST,
  port: process.env.SMPT_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMPT_USER, // generated ethereal user
    pass: process.env.SMPT_PASSWORD, // generated ethereal password
  },
});

export const send = ({email, subject, html}) => {
  transporter.sendMail({
    from: 'Auth API', // sender address
    to: email, // list of receivers
    subject, // Subject line
    text: "", // plain text body
    html, // html body
  })
}

export const sendActivationLink = (email, token) => {
  const link = `${process.env.CLIENT_URL}/activate/${token}`
  return send({
    email,
    subject: 'Account activation',
    html: `
      <h1>Account activation</h1>
      <a href="${link}">${link}</a>
    `
  })
}
