import { signup, signin, signout } from '../handlers/authenticateHandler';

exports.routes = server => {
  server.route({
    method: 'POST',
    path: '/authenticate/signup',
    handler: (request, response) => signup(server, request, response)
  });

  server.route({
    method: 'POST',
    path: '/authenticate/signin',
    handler: (request, response) => signin(server, request, response)
  });

  server.route({
    method: 'POST',
    path: '/authenticate/signout',
    handler: (request, response) => signout(server, request, response)
  });
};
