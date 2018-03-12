'use strict';

// Set configuration
require('./config/config').default('mail');

import { SMTPServer } from 'smtp-server';
import mongoose from './util/mongoose';
import { mailServerOptions } from './config/options'

class MailServer {
  constructor() {
    this.host = process.env.MAILHOST;
    this.port = process.env.MAILPORT;
    this.mongooseURI = process.env.MAILMONGOOSEURI;
    this.SMTPServer = null;
    this.db = mongoose(this.mongooseURI);
    this.options = mailServerOptions;
    //this.db.createCollection('domains', err => err ? console.error(err) : null);
    //this.db.createCollection('keys', err => err ? console.error(err) : null);
  }

  run() {
    this.SMTPServer = new SMTPServer(this.options)
      .listen(this.port/*, this.host TODO: see if this is needed */, err => {
        if (err) {
          return console.error(err);
        }
        console.log(`*****\nMAIL SERVER\n${require('date-and-time').format(new Date(), 'HH:mm:ss | DD MMM Y')}\n${this.host}:${this.port}\n*****`);
      });
  }

  stop() {
    if (this.SMTPServer) {
      this.SMTPServer.close(() => this.SMTPServer = null);
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
