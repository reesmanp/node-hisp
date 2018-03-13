import jwt from 'jsonwebtoken';
const key = process.env.JWTSECRET;

export function signToken (payload, callback) {
  return jwt.sign(payload, key, {}, callback);
}

export function verify (token, callback) {
  return jwt.verify(token, key, {}, callback);
}
