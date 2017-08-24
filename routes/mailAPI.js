import { sendMail } from '../handlers/mailAPIHandler';

exports.routes = server => {
  server.route({
    method: 'POST',
    path: '/mail',
    handler: (request, response) => sendMail(response, server.app.mailServer, request.payload.creds, request.payload.opts)
  });
};
