import JWT from 'jsonwebtoken';
import server from '../server';

// JWT Validation Function
function jwtAuth(decoded, request, callback) {
  // TODO: add request.plugins.scooter.toJSON() in JWT storage <-- device info
  const sessions = server.app.sessions;
  // Find a session
  if (sessions.hasOwnProperty(decoded.sessionId)) {
    const session = sessions[`${decoded.sessionId}`];
      // If the JWT matches the latest issued JWT
      if (session.token.username === decoded.username && session.token.iat === decoded.iat) {
        // Refresh JWT
        const token = {
          username: decoded.username,
          sessionId: decoded.sessionId,
          iat: Date.now()
        };
        // Update stored JWT
        clearTimeout(session.timeout);
        server.app.sessions[`${decoded.sessionId}`] = {
          token: token,
          timeout: setTimeout(() => delete server.app.sessions[`${decoded.sessionId}`], 5 * 60 * 1000)
        };
        request.auth.token = JWT.sign(token, process.env.JWTSECRET, {expiresIn: 5 * 60});
        return callback(null, true);
      }
      // JWT is not the latest issued JWT
      return callback(null, false);
    }
    // Session does not exist in memory
    return callback(null, false);
}

export {
  jwtAuth
};
