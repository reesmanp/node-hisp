import moment from 'moment';
import randomstring from 'randomstring';
import { encrypt, hash } from '../util/krypto';
import { JWTModel, UserModel } from '../util/mongoose';
import { signToken } from '../util/jwt';

const OK = 200;
const BAD_REQUEST = 400;
const SERVER_ERROR = 500;

const KEY_LENGTH = 16;
const TIME_OUT = 5;

/*
 * Sign Up
 * POST
 * /authenticate/register
 */
export async function signup(server, request, h) {
  const [username, ] = hash(request.payload.username, request.username.password);

  let user;
  try {
    user = await UserModel.findOne({ username: username });
    if (user) {
      throw new Error();
    }
  } catch (e) {
    console.error(e);
    return h.response('Username already exists!').code(BAD_REQUEST);
  }

  const [password, salt] = hash(request.payload.password);
  const [email, ] = encrypt(request.payload.email, salt);

  const newUser = UserModel({
    username: username,
    password: password,
    salt: salt,
    email: email
  });

  try {
    await newUser.save();
  } catch (e) {
    console.error(e);
    return h.response('Could not create the user!').code(SERVER_ERROR);
  }

  return h.response('User created!').code(OK);
}

/*
 * Sign In
 * POST
 * /authenticate
 */
export async function signin(server, request, h) {
  const username = hash(request.payload.username, request.payload.password);

  try {
    await UserModel.findOne({ username: username });
  } catch (e) {
    return h.response('No user with those credentials found!').code(BAD_REQUEST);
  }

  // Create JWT
  const now = moment();
  const payload = {
    user: username,
    randomString: randomstring(KEY_LENGTH),
    originalTime: now,
    newTime: now.add(TIME_OUT, 'minutes'),
    ip: request.info.remoteAddress
  };
  const jwt = new JWTModel(payload);

  try {
    await jwt.save();
  } catch (e) {
    console.error(e);
    return h.response('Could not save the session!').code(BAD_REQUEST);
  }

  request.cookieAuth.clear();
  request.cookieAuth.set({ HISPToken: signToken(payload) });
  return h.response('You are signed in!').code(OK);
}

/*
 * Sign Out
 * DELETE
 * /authenticate
 */
export async function signout(server, request, h) {
  try {
    await webToken.findOneAndRemove({ randomString: request.auth.credentials.randomString });
  } catch (e) {
    return h.response('Could not terminate session!').code(SERVER_ERROR);
  }

  request.cookieAuth.clear();
  return h.response('You are signed out!').code(OK);
}
