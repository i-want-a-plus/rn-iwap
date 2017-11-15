import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import globalErrorMiddleware from '../middlewares/error';
import authMiddleware from '../middlewares/auth';

export default function configureStore () {
  const store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware,
      authMiddleware,
      globalErrorMiddleware,
      promiseMiddleware()
    )
  );

  return store;
};
