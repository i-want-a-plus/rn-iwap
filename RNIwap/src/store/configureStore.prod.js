import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import customizedMiddlewares from '../middlewares';

export default function configureStore () {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunkMiddleware),
      applyMiddleware(promiseMiddleware()),
      customizedMiddlewares,
    )
  );

  return store;
};
