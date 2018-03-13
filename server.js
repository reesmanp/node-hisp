// Require babel
require('babel-register');

require('./config/config').default('server');

const Hapi = require('hapi');
const mailServer = require('./mailServer').MailServer;
const mongoose = require('./util/mongoose').default(process.env.MONGOOSEURI);
const options = require('./config/options').default;

// Create a server with a host and port
const server = new Hapi.Server({
    port: process.env.PORT
});

// Start mailServer
server.app.mailServer = new mailServer();
server.app.mailServer.run();
server.app.db = mongoose;

// Create new JWT secret
process.env.JWTSECRET = require('crypto').randomBytes(256).toString('base64');

async function startServer() {
  await server.register([
      require('inert'),
      require('hapi-auth-jwt2'),
      require('scooter'),
      options.hapiRoutes(__dirname),
      options.good
  ]);

  server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWTSECRET,
      validate: require('./util/auth').validateJWT,
      verifyOptions: {algorithms: ['HS256']}
  });

  await server.start();

  process.on('SIGTERM', () => {
    server.app.mailServer.stop();
    server.stop();
  });

  require('ascii-art').font('Node', 'Doom', 'red').font('HISP', 'Doom', 'italic+green', ascii => {
      console.log(ascii);
      console.log('*****');
      console.log('API SERVER');
      console.log(`${require('date-and-time').format(new Date(), 'HH:mm:ss | DD MMM Y')}`);
      console.log(`${server.info.uri}`);
      console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
      console.log('*****');
  });
}

startServer();

module.exports = server;
