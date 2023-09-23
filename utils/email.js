const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Amr Elkfrawy <${process.env.EMAIL_FROM}>`;
  }

  transporter() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        host: process.env.BERVO_HOST,
        port: process.env.BERVO_PORT,
        auth: {
          user: process.env.BERVO_USERNAME,
          pass: process.env.BERVO_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // 1) Render HTML based on pug template
    const location = __dirname;
    console.log(location);
    const html = pug.renderFile(`${location}/../public/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.htmlToText(html),
    };

    // 3) Create a transport and send email
    console.log('From only send ');
    await this.transporter().sendMail(mailOptions);
  }

  async sendWelcome() {
    console.log('From send welcome');
    await this.send('welcome', 'Welcome to the Tour-Booker!');
  }

  async sendPasswordReset() {
    await this.send(
      'resetPassword',
      'Your password reset token (valid for only 10 min)',
    );
  }
};
