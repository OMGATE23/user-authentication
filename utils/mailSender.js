const nodemailer = require('nodemailer')

const mailSender = async(options) => {
    let transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORT,
        auth: {
          user: process.env.USER, 
          pass: process.env.PASS, 
        },
      });

      const message = {
        from: 'omgate@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.text,
        html: options.html, 
      }
    
      await transporter.sendMail(message);
}

module.exports = mailSender