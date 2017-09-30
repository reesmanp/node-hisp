import JWT from 'jsonwebtoken';
import crypto from 'crypto';

// Sign Up
function signup(server, request, response) {
  const {
    username,
    password
  } = request.payload;

  if (username && password) {
    const users = server.app.db.collection('users');
    const status = users.updateOne(
      { username: username },
      { $setOnInsert: { password: password } },
      { upsert: true }
    );
    return response(status);
  }
  return response('No username or password!').code(400);
}

// Sign In
function signin(server, request, response) {
  const {
    username,
    password
  } = request.payload;

  if (username && password) {
    const users = server.app.db.collection('users');
    users.findOne(
      {username: username}
    ).then(user => {
      if (user.password === password) {
        const token = {
          username: username,
          sessionId: crypto.randomBytes(256).toString('base64'),
          iat: Date.now()
        };
        server.app.sessions[`${token.sessionId}`] = {
          token: token,
          device: request.plugins.scooter.toJSON(),
          timeout: setTimeout(() => delete server.app.sessions[`${token.sessionId}`], 5 * 60 * 1000)
        };
        const jwt = JWT.sign(token, process.env.JWTSECRET, { expiresIn: 5 * 60 });
        return response('You are logged in!').header('Authorization', jwt);
      }
      return response('Invalid username or password').code(400);
    });
  } else {
    return response('No username or password!').code(400);
  }
}

// Sign Out
function signout(server, request, response) {
  clearTimeout(server.app.sessions[`${request.auth.credentials.sessionId}`]);
  delete server.app.sessions[`${request.auth.credentials.sessionId}`];
  return response('You are logged out');
}

export {
  signup,
  signin,
  signout
};
