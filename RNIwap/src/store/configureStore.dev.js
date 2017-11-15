import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import DevTools from '../containers/DevTools';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import customizedMiddlewares from '../middlewares';

export default function configureStore () {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunkMiddleware),
      applyMiddleware(promiseMiddleware(), createLogger()),
      customizedMiddlewares,
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    });
  }

  return store;
};