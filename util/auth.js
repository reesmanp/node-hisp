import { signToken } from './jwt';
import { JWTModel } from './mongoose';
import moment from 'moment';

const TIME_OUT = 5;

// JWT Validation Function
export async function validateJWT(decoded, request) {
  const {
    user,
    originalTime,
    newTime,
    randomString,
    ip
  } = decoded;

  // Check if JWT values exist
  if (!user || !originalTime || !newTime || !randomString || !ip) {
    return {
      isValid: false,
      credentials: {}
    };
  }

  // Find JWT in DB
  let token;
  try {
    token = await JWTModel.findOne({ randomString: randomString });
    if (!token) {
      throw new Error();
    }
  } catch (e) {
    return {
      isValid: false,
      credentials: {}
    };
  }

  // Compare stored JWT with received JWT
  if (
    (user !== token.user) ||
    (moment(originalTime).diff(token.originalTime) !== 0) ||
    (moment(newTime).diff(token.newTime) !== 0) ||
    (ip !== token.ip) ||
    (ip !== request.info.remoteAddress)
  ) {
    return {
      isValid: false,
      credentials: {}
    };
  }

  // JWT expired
  const now = moment();
  if (now.diff(newTime) > 0) {
    return {
      isValid: false,
      credentials: {}
    };
  }

  // Create new JWT
  const newWebToken = {
    user: user,
    originalTime: originalTime,
    newTime: now.add(TIME_OUT, 'minutes'),
    randomString: randomString,
    ip: ip,
    createdAt: now
  };
  const newToken = Object.assign(token, newWebToken);

  // Send new JWT to DB
  try {
    await JWTModel.findOneAndUpdate({ randomString: randomString }, newToken);
  } catch (e) {
    return {
      isValid: false,
      credentials: {}
    };
  }

  // Successful authentication
  return {
    valid: true,
    credentials: { HISPToken: signToken(newWebToken) }
  };
}
