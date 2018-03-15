import { Map } from 'immutable';
import { modal as Actions } from '../actions';

const initialState = Map({
  modal: Map({
    action: 'off'
  })
});

export const modal = (state = initialState.get('modal'), action) => {
  switch (action.type) {
    case Actions.MODAL_ON:
      return state.set('action', action.value);

    case Actions.MODAL_OFF:
      return state.set('action', action.value);

    default:
      return state;
  }
};
