import { createStore, applyMiddleware, compose } from 'redux';

import globalErrorMiddleware from './error';
import authMiddleware from './auth';

export default compose(
  applyMiddleware(
    authMiddleware,
    globalErrorMiddleware
  )
);