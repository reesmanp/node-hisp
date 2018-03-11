// Require babel
require('babel-register');

require('./config/config').default('server');

const Hapi = require('hapi');
const mailServer = require('./mailServer').MailServer;
const mongoose = require('./util/mongoose').default;

// Create a server with a host and port
const server = new Hapi.Server({
    port: process.env.PORT
});

// Start mailServer
server.app.mailServer = new mailServer();
server.app.mailServer.run();
server.app.db = mongoose;
server.app.sessions = {};

// Create new JWT secret
process.env.JWTSECRET = require('crypto').randomBytes(256).toString('base64');

async function startServer() {
  await server.register([
      require('inert'),
      require('hapi-auth-jwt2'),
      require('scooter'),
      require('./config/options').hapiRoutes(__dirname),
      require('./config/options').good
  ]);

    server.auth.strategy('jwt', 'jwt', true, {
        key: process.env.JWTSECRET,
        validateFunc: require('./util/auth').jwtAuth,
        verifyOptions: {algorithms: ['HS256']}
    });

    await server.start();

    require('ascii-art').font('Node', 'Doom', 'red').font('HISP', 'Doom', 'italic+green', ascii => {
        console.log(ascii);
        console.log('*****');
        console.log(`${require('date-and-time').format(new Date(), 'HH:mm:ss | DD MMM Y')}\n${server.info.uri}`);
        console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
        console.log('*****');
    });
}

startServer();

module.exports = server;
