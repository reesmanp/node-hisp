import mailer from '../util/mailer';

// Uses a mail server object to send an email
function sendMail(response, mailServer, credentials, mailOpts) {
  // TODO: should be done at login
  const { host, port } = mailServer.getConfig();
  const { user, pass } = credentials;
  const mailObj = new mailer(host, port, user, pass);

  mailObj.createMail(mailOpts);
  mailObj.sendMail()
    .then(results => console.log(results))
    .catch(err => console.error(err));

  response().code(200);
}

export {
  sendMail
};
