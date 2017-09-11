import mailer from '../util/mailer';

// Uses a mail server object to send an email
function sendMail(server, request, response) {
  // TODO: should be done at login
  const { host, port } = mailServer.getConfig();
  const { user, pass } = request.payload.credentials;
  const mailOpts = request.payload.mailOpts;
  const mailObj = new mailer(host, port, user, pass);

  mailObj.createMail(mailOpts);
  mailObj.sendMail()
    .then(results => response(results)
      .header('Authorization', request.auth.token))
    .catch(err => console.error(err) && response(err).code(500)
      .header('Authorization', request.auth.token));
}

// Adds a hosted domain to MongoDB
function createDomain(server, request, response) {
  const domains = server.app.mailServer.db.collection('domains');
  // TODO: add domain name validation
  if (!request.payload.domain) {
    return response('No domain sent!').code(400)
      .header('Authorization', request.auth.token);
  }
  domains.updateOne(
    { user: request.auth.credentials.username },
    { $addToSet:
      {
        domains: { name: request.payload.domain, type: 'hosted' }
      }
    },
    { upsert: true }
  );
  return response(`Domain ${request.payload.domain} created!`)
    .header('Authorization', request.auth.token);
}

// Returns all domains
function getDomains(server, request, response) {
  const domains = server.app.mailServer.db.collection('domains');
  domains.find().toArray((err, result) => {
    if (err) {
      return response(err).code(500)
        .header('Authorization', request.auth.token);
    }
    return response(`All domains:\n${result.map(e => JSON.stringify(e.domains)).join('\n')}`)
      .header('Authorization', request.auth.token);
  });
}

// Deletes a domain
function deleteDomain(server, request, response) {
  const domains = server.app.mailServer.db.collection('domains');
  domains.updateOne(
    { user: request.auth.credentials.username },
    { $pull:
      {
        domains: { name: request.payload.domain }
      }
    }
  );
  return response(`Domain ${request.payload.domain} deleted!`)
    .header('Authorization', request.auth.token);
}

export {
  sendMail,
  createDomain,
  getDomains,
  deleteDomain
};
