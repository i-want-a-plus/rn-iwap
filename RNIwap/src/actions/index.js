import * as types from './types';

import { api } from '../services';

export function test() {
  return dispatch => {
    return dispatch({
      type: types.TEST,
      payload: api.fetchTest()
    });
  };
}