import JWT from 'jsonwebtoken';
import server from '../server';
import _ from 'lodash';

// JWT Validation Function
function jwtAuth(decoded, request, callback) {
  const sessions = server.app.sessions;

  // Find a session
  if (sessions.hasOwnProperty(decoded.sessionId)) {
    const session = sessions[`${decoded.sessionId}`];
    const device = request.plugins.scooter.toJSON();

      // If the JWT matches the latest issued JWT
      if (session.token.username === decoded.username && session.token.iat === decoded.iat) {
        // A different device is using the issued JWT
        if (!_.isEqual(device, session.device)) {
          return callback(null, false);
        }

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
          device: device,
          timeout: setTimeout(() => delete server.app.sessions[`${decoded.sessionId}`], 5 * 60 * 1000)
        };

        // Sign new JWT
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
