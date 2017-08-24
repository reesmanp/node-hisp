'use strict';

// Set configuration
require('./config/config').default('mail');

const SMTPServer = require('smtp-server').SMTPServer;
const optionFunctions = require('./util/optionFunctions');

const options = {
  secure: true,
  //name
  authMethods: ['PLAIN', 'LOGIN'],
  onAuth: optionFunctions.onAuth,
  onData: optionFunctions.onData,
  onConnect: optionFunctions.onConnect
};

class MailServer {
  constructor() {
    this.host = process.env.MAILHOST;
    this.port = process.env.MAILPORT;
    this.SMTPServer = null;
  }

  run() {
    this.SMTPServer = new SMTPServer(options)
      .listen(this.port, this.host, err => {
        if (err) {
          return console.error(err);
        }
        console.log(`*****\nMAIL SERVER\n${require('date-and-time').format(new Date(), 'HH:mm:ss | DD MMM Y')}\n${this.host}:${this.port}\n*****`);
      });
  }

  stop() {
    if (this.SMTPServer) {
      this.SMTPServer.close(e => this.SMTPServer = null);
    }
  }

  getConfig() {
    return {
      host: this.host,
      port: this.port
    };
  }
}

export {
  MailServer
};
