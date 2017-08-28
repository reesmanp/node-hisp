import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appStore from '../reducers'

const store = createStore(
  appStore,
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
);

export default () => (
  <Provider store={store}>
    <div>
      I did a react!
    </div>
  </Provider>
);
