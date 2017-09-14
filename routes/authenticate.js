import { signup, signin, signout } from '../handlers/authenticateHandler';

// Sign Up Route
exports.routes = server => {
  server.route({
    method: 'POST',
    path: '/authenticate/signup',
    config: {
      auth: false
    },
    handler: (request, response) => signup(server, request, response)
  });

  // Sign In Route
  server.route({
    method: 'POST',
    path: '/authenticate/signin',
    config: {
      auth: false
    },
    handler: (request, response) => signin(server, request, response)
  });

  // Check if Signed In Route
  server.route({
    method: 'GET',
    path: '/authenticate/signin',
    handler: (request, response) => response().header('authorization', request.auth.token)
  });

  // Sign Out Route
  server.route({
    method: 'POST',
    path: '/authenticate/signout',
    handler: (request, response) => signout(server, request, response)
  });
};
