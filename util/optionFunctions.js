'use strict';

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

export {
  onAuth,
  onConnect,
  onData
};
