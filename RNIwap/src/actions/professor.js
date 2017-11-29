import * as types from './types';
import { api } from '../services';
import { performAuthCheck } from './auth';

export const performProfessorSearch = query => dispatch => dispatch({
  type: types.PROFESSOR_SEARCH,
  payload: query.query ? api.fetchProfessorList(query) : new Promise((resolve) => resolve([]))
}).catch(e => {
  dispatch({ type: types.GLOBAL_ERROR, payload: e });
});
