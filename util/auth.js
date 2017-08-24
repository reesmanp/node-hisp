import JWT from 'jsonwebtoken';
import { MongoClient } from'mongodb';

// Connect to MongoDB
let sessions;
MongoClient.connect(process.env.MONGO, (err, db) => {
  if (err) {
    return console.error(err);
  }
  sessions = db.collection('jwt');
})

// JWT Validation Function
function jwtAuth(decoded, request, callback) {
  // Find a session
  sessions.findOne({ sessionId: decoded.sessionId })
    .then(session => {
      // If the JWT matches the latest issued JWT
      if (session.username === decoded.username && session.iat === decoded.iat) {
        // Refresh JWT
        const token = {
          username: decoded.username,
          sessionId: decoded.sessionId,
          iat: Date.now()
        };
        // Update stored JWT
        sessions.updateOne({ sessionId: token.sessionId }, token);
        request.auth.token = JWT.sign(token, process.env.JWTSECRET, {expiresIn: 5 * 60});
        return callback(null, true);
      }
      // JWT is not the latest issued JWT
      return callback(null, false);
    })
    .catch(err => console.error(err) && callback(err, false));
}

export {
  jwtAuth
};
