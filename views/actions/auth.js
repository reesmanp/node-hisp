export const SET_JWT = 'SET_JWT';
export const setJwt = j => ({
  type: SET_JWT,
  value: j
});

export const SET_PASSWORD = 'SET_PASSWORD';
export const setPassword = p => ({
  type: SET_PASSWORD,
  value: p
});

export const SET_USERNAME = 'SET_USERNAME';
export const setUsername = u => ({
  type: SET_USERNAME,
  value: u
});

export const SIGN_OUT = 'SIGN_OUT';
export const signOut = () => ({
  type: SIGN_OUT
});
