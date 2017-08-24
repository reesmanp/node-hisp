// Require babel for runtime es5 syntax
require('babel-register')({
  presets: ['es2015']
});
'use strict';

require('./config/config').default('server');

const Hapi = require('hapi');
const Good = require('good');
const mailServer = require('./mailServer').MailServer;

// Create a server with a host and port
const server = new Hapi.Server();

server.connection({
  host: process.env.HOST,
  port: process.env.PORT
});

// Start mailServer
server.app.mailServer = new mailServer();
server.app.mailServer.run();

// Connect to mongodb
require('mongodb').MongoClient.connect(process.env.MONGO, (err, db) => {
  if (err) {
    return console.error(err);
  }
  server.app.db = db;
  server.app.db.createCollection('users', err => err ? console.error(err) : null);
})

// Server Logging Options
const Options = {
  ops: {
    interval: 1000
  },
  reporters: {
    myConsoleReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{log: '*', response: '*', error: '*'}]
    }, {
      module: 'good-console'
    }, 'stdout']
  }
};

server.register([
  require('inert'),
  {
    register: require('hapi-routes'),
    options: {
      dir: `${__dirname}/routes`
    }
  },
  {
    register: Good,
    options: Options
  }
], err => {
  if(err) {
    return console.error("Failed to load a plugin: ", err);
  }
  // Start the server
  server.start(err => {
    if(err) {
      return console.error(err);
    }
    console.log(`*****\nSERVER\n${require('date-and-time').format(new Date(), 'HH:mm:ss | DD MMM Y')}\n${server.info.uri}\n*****`);
  });
});
