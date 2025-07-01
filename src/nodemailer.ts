import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: "mail.pakwachfm.com", // make sure to get ssl
  // host: "server336.web-hosting.com", //has ssl
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "info@pakwachfm.com",
    // pass: 5~R26v00(Yic
    pass: "KEA#xK2ZdsDv"
  },
});

const noReplyTransporter = nodemailer.createTransport({
  host: "mail.pakwachfm.com", // make sure to get ssl
  // host: "server336.web-hosting.com", //has ssl
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "no-reply@pakwachfm.com",
    // pass: 5~R26v00(Yic
    pass: "YQ.JOBSO;}exIyv,"
  },
});

export async function sendPasswordResetLInk(email: string, title: string, name: string, link: string) {

  const info1 = await transporter.sendMail({
    from: '"Pakwach FM" <info@pakwachfm.com>',
    to: email, // list of receivers
    subject: title, // Subject line
    text: "Password Reset",
    html: "<!DOCTYPE html><html><head><meta charset='utf-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><title> Reset your Password</title><meta name='viewport' content='width=device-width, initial-scale=1'><link rel='stylesheet' type='text/css' media='screen' href='main.css'><script src='main.js'></script></head><body><div><p>Hello "+name+"</p><p>Your password reset link is here below, click the link to reset your account password </p><p>"+link+"</p><p>If you didnt make this request please ignore this email.</p><p>Regards<br/>Team at Pakwach Fm, @no-reply(do not reply to this email)</p></div></body></html>",
    // html: JSON.stringify(template(email, title))
  });

  return info1.messageId
}

export async function noReply(email: string, title: string) {

  const info1 = await noReplyTransporter.sendMail({
    from: '"no-reply@pakwachfm.com',
    to: email, // list of receivers
    subject: title, // Subject line
    text: "Do not Reply",
    html: "<!DOCTYPE html><html><head><meta charset='utf-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><title> Do not reply </title><meta name='viewport' content='width=device-width, initial-scale=1'><link rel='stylesheet' type='text/css' media='screen' href='main.css'><script src='main.js'></script></head><body><div><p>Hello "+email+"</p><p>We received your message and, we will gwt back to you soon. </p><p>If you didnt make this request please ignore this email.</p><p>Regards<br/>no-reply at Pakwach Fm,</p><p>Call center: <br/><li>+256-772-331128</li><li>+256-702-632200</li></p></div></body></html>",
    // html: JSON.stringify(template(email, title))
  });

  return info1.messageId
}

export async function messageReplyHtml(email: string, title: string, reply: string) {

  const info1 = await transporter.sendMail({
    from: '"Pakwach FM" <info@pakwachfm.com>',
    to: email, // list of receivers
    subject: title, // Subject line
    text: "Message Response",
    html: "<!DOCTYPE html><html><head><meta charset='utf-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><title> Reply to Message </title><meta name='viewport' content='width=device-width, initial-scale=1'><link rel='stylesheet' type='text/css' media='screen' href='main.css'><script src='main.js'></script></head><body><div><p>Hello "+email+"</p><p>We received your message and, </p><p>"+reply+"</p><p>If you didnt make this request please ignore this email. If you need more assistance please let us know</p><p>Regards<br/>Team at Pakwach Fm,</p><p>Call center: <br/><li>+256-772-331128</li><li>+256-702-632200</li></p></div></body></html>",
    // html: JSON.stringify(template(email, title))
  });

  return info1.messageId
}