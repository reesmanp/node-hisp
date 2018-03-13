import { signup, signin, signout } from '../handlers/authenticateHandler';

// Sign Up Route
exports.routes = server => {
  server.route({
    method: 'POST',
    path: '/authenticate/register',
    config: {
      auth: false
    },
    handler: (request, h) => signup(server, request, h)
  });

  // Sign In Route
  server.route({
    method: 'POST',
    path: '/authenticate',
    config: {
      auth: false
    },
    handler: (request, h) => signin(server, request, h)
  });

  // Check if Signed In Route
  server.route({
    method: 'GET',
    path: '/authenticate',
    handler: (request, h) => h.response().header('authorization', request.auth.token)
  });

  // Sign Out Route
  server.route({
    method: 'DELETE',
    path: '/authenticate',
    handler: (request, h) => signout(server, request, h)
  });
};
