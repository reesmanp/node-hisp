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
    const status = users.update(
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
        const sessions = server.app.db.collection('jwt');
        sessions.insertOne(token);
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
  const sessions = server.app.db.collection('jwt');
  sessions.deleteOne(request.auth.credentials);
  return response('You are logged out');
}

export {
  signup,
  signin,
  signout
};
