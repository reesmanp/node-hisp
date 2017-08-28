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
  //host: process.env.HOST,  TODO: see if this is needed at all
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
  server.app.db.createCollection('jwt', err => err ? console.error(err) : null);
  server.app.db.createIndex('jwt', { sessionId: 1 }, { unique: true });
})

// Create new JWT secret
process.env.JWTSECRET = require('crypto').randomBytes(256).toString('base64');

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
  require('hapi-auth-jwt2'),
  require('scooter'),
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

  server.auth.strategy('jwt', 'jwt', true, {
    key: process.env.JWTSECRET,
    validateFunc: require('./util/auth').jwtAuth,
    verifyOptions: { algorithms: ['HS256'] }
  });

  // Start the server
  server.start(err => {
    if(err) {
      return console.error(err);
    }
    console.log(`*****\nSERVER\n${require('date-and-time').format(new Date(), 'HH:mm:ss | DD MMM Y')}\n${server.info.uri}\n*****`);
  });
});
