/*
 * Start AUTH Actions
 */

const SET_JWT = 'SET_JWT';
const setJwt = j => ({
  type: SET_JWT,
  value: j
});

const SET_PASSWORD = 'SET_PASSWORD';
const setPassword = p => ({
  type: SET_PASSWORD,
  value: p
});

const SET_USERNAME = 'SET_USERNAME';
const setUsername = u => ({
  type: SET_USERNAME,
  value: u
});

const SIGN_OUT = 'SIGN_OUT';
const signOut = () => ({
  type: SIGN_OUT
});

export const auth = {
  SET_JWT, setJwt,
  SET_PASSWORD, setPassword,
  SET_USERNAME, setUsername,
  SIGN_OUT, signOut
};

/*
 * End AUTH Actions
 */
