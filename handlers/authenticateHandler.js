function signup(server, request, response) {
  const {
    username,
    password
  } = request.payload;

  if (username && password) {
    const users = server.app.db.collection('users');
    const status = users.update(
      {username: username},
      {$setOnInsert: {password: password}},
      {upsert: true}
    );
    return response(status);
  }
  return response('No username or password!').code(400);
}

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
      console.log(user);
      if (user.password === password) {
        return response('You are logged in!');
      }
      return response('Invalid username or password').code(400);
    });
  } else {
    return response('No username or password!').code(400);
  }
}

function signout(server, request, response) {
  return response('You are logged out');
}

export {
  signup,
  signin,
  signout
};
