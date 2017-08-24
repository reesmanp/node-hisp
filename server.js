'use strict';
const SMTPServer = require('smtp-server').SMTPServer;

function onAuth(auth, session, callback) {
  if (auth.username === 'test') {
    callback(null, { user: auth.username });
  } else {
    callback(new Error('Invalid username!'));
  }
}

function onData(stream, session, callback) {
  console.log('Data:');
  stream.pipe(process.stdout);
  stream.on('end', callback);
}

function onConnect(session, callback) {
  console.log(`Session:\n${JSON.stringify(session)}`);
  callback();
}

const options = {
  secure: false,
  //name
  authMethods: ['PLAIN', 'LOGIN'],
  onAuth: onAuth,
  onData: onData,
  onConnect: onConnect
};

const server = new SMTPServer(options)
  .listen(1025, 'localhost', err => { 
    console.log('Server is up!');
    if (err) {
      console.error(err);
    }
  });

