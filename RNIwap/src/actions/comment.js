import * as types from './types';
import { api } from '../services';
import { performAuthCheck } from './auth';

export const performCommentFetch = query => dispatch => dispatch({
  type: types.COMMENT_FETCH,
  payload: api.fetchComment(query),
  meta: query
}).catch(e => {
  dispatch({ type: types.GLOBAL_ERROR, payload: e });
});

export const performCommentSubmit = (query, meta) => dispatch => dispatch({
  type: types.COMMENT_SUBMIT,
  payload: Promise.all([
    dispatch(performAuthCheck()),
    api.postComment({
      ...query,
      [ _.capitalize(query.type) + 'Id' ]: query.id
    })
  ]),
  meta
}).catch(e => {
  dispatch({ type: types.GLOBAL_ERROR, payload: e });
});