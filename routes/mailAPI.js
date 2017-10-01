import {
  sendMail,
  createDomain,
  getDomains,
  deleteDomain
} from '../handlers/mailAPIHandler';

exports.routes = server => {
  // Send mail
  server.route({
    method: 'POST',
    path: '/mailapi',
    handler: (request, response) => sendMail(server, request, response)
  });

  // Create domains
  server.route({
    method: 'POST',
    path: '/mailapi/domain',
    handler: (request, response) => createDomain(server, request, response)
  });

  // Retrieve domains
  server.route({
    method: 'GET',
    path: '/mailapi/domain',
    handler: (request, response) => getDomains(server, request, response)
  });

  // Remove domains
  server.route({
    method: 'DELETE',
    path: '/mailapi/domain',
    handler: (request, response) => deleteDomain(server, request, response)
  });
};
