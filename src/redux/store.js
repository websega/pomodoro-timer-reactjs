import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import rootReducer from './reducers';

import { loadState, saveState } from '../utils/localStorage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();

const setupStore = () => {
  if (process.env.NODE_ENV !== 'production') {
    return createStore(
      rootReducer,
      persistedState,
      composeEnhancers(applyMiddleware(logger))
    );
  }
  return createStore(rootReducer, persistedState);
};

const store = setupStore();

store.subscribe(() => {
  saveState({
    settings: store.getState().settings,
  });
});

export default store;
