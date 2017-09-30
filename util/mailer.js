'use strict';
const nodemailer = require('nodemailer');

// Mailer class
class Mailer {
  constructor(host, port, user, pass) {
    this.host = host;
    this.port = port;
    this.user = user;
    this.pass = pass;
    this.mailOpts = {};

    this.transporter = nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: true,
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        user: this.user,
        pass: this.pass
      }
    });
  }

  createMail(mailOpts) {
    ['from', 'to', 'cc', 'bcc', 'subject', 'text', 'html', 'attachments', 'dkim']
      .forEach(i => mailOpts.hasOwnProperty(i) ? this.mailOpts[i] = mailOpts[i] : null);
    return this;
  }

  sendMail(callback) {
    if (callback) {
      this.transporter.sendMail(this.mailOpts, callback);
    } else {
      return new Promise((resolve, reject) => (
        this.transporter.sendMail(this.mailOpts, (error, info) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(info);
          }
        })
      ));
    }
  }
}

export default Mailer;
