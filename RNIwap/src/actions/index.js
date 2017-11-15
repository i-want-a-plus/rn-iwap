import * as types from './types';

import { api } from '../services';

export const test = (fail) => dispatch => dispatch({
  type: types.TEST,
  payload: fail ? api.fetchTestWillFail() : api.fetchTest()
}).catch(e => {
  dispatch({ type: types.GLOBAL_ERROR, payload: e });
});
