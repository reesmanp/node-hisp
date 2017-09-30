import { Map } from 'immutable';
import { auth as Actions } from '../actions';

let initialState = Map({
  auth: Map({
    username: '',
    password: '',
    jwt: undefined
  })
});

export const auth = (state = initialState.get('auth'), action) => {
  switch (action.type) {
    case Actions.SET_USERNAME:
      return state.set('username', action.value);

    case Actions.SET_PASSWORD:
      return state.set('password', action.value);

    case Actions.SET_JWT:
      return state.set('jwt', action.value);

    case Actions.SIGN_OUT:
      state.set('username', '');
      state.set('password', '');
      state.set('jwt', undefined);

    default:
      return state;
  }
};
