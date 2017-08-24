import { sendMail, createDomain, getDomains } from '../handlers/mailAPIHandler';

exports.routes = server => {
  server.route({
    method: 'POST',
    path: '/api/mail',
    handler: (request, response) => sendMail(server, request, response)
  });

  server.route({
    method: 'POST',
    path: '/api/domain',
    handler: (request, response) => createDomain(server, request, response)
  });

  server.route({
    method: 'GET',
    path: '/api/domain',
    handler: (request, response) => getDomains(server, request, response)
  });
};
