import crypto from 'crypto';

/*
 * Encrypting Function
 */
export function encrypt (text, key = crypto.randomBytes(16).toString('hex')) {
  const cipher = crypto.createCipher('aes256', key);
  let encrypted = cipher.update(text, 'utf', 'hex');
  encrypted += cipher.final('hex');
  return [encrypted, key];
}

/*
 * Hashing Function
 */
export function hash (text, salt = crypto.randomBytes(16).toString('hex')) {
  const hashedHexPwd = crypto.createHash('sha256');
  hashedHexPwd.update(`${text}${salt}`);
  const hashedPwd = hashedHexPwd.digest('hex');
  return [hashedPwd, salt];
}
