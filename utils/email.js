const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Shruti Tiwari <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //sendgrid
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async send(template, subject) {
    //send the actual email
    //1) render html based on pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template.pug}`,
      {
        firstName: this.firstName,
        url: this.url,
        subject
      }
    );

    //2) define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    //3) create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sentWelcome() {
    await this.send('welcome', 'Welcome to the Natours familty!');
  }
};

// const sentEmail = option => {
//   //1) create a transportor
//   const transportor = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD
//     }
//   });
//   //activate in gmail "less secure app" option
// };
