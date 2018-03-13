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
    Object(mailOpts).keys()
      .filter(i => ['from', 'to', 'cc', 'bcc', 'subject', 'text', 'html', 'attachments', 'dkim'].includes(i))
      .forEach(i => {
        this.mailOpts[i] = mailOpts[i];
      });

    return this;
  }

  sendMail(callback) {
    if (callback) {
      return this.transporter.sendMail(this.mailOpts, callback);
    }
    return new Promise((resolve, reject) => this.transporter.sendMail(this.mailOpts, (error, info) => {
      if (error) {
        return reject(error);
      }
      return resolve(info);
    }));
  }

}

export default Mailer;
