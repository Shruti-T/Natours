const nodemailer = require('nodemailer');

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

const sendEmail = async options => {
  //1) create a transportor
  const transportor = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  //2)Define the email options
  const mailOptions = {
    from: 'Shruti Tiwari <sh03shruti@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  //3) actually send the email
  await transportor.sendMail(mailOptions);
};

module.exports = sendEmail;
