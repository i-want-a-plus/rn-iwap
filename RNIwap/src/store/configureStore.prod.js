import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

export default function configureStore () {
  const store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware,
      promiseMiddleware()
    )
  );

  return store;
};
