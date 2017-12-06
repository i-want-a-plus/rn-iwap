import * as types from './types';
import { api } from '../services';
import { performAuthCheck } from './auth';

export const performFavoriteFetch = () => dispatch => dispatch({
  type: types.FAVORITE_FETCH,
  payload: api.favorite.fetch()
}).catch(e => {
  dispatch({ type: types.GLOBAL_ERROR, payload: e });
});

export const performFavoriteAdd = (query, meta) => dispatch => dispatch({
  type: types.FAVORITE_ADD,
  payload: Promise.all([
    dispatch(performAuthCheck()),
    api.favorite.add(query)
  ]),
  meta
}).catch(e => {
  dispatch({ type: types.GLOBAL_ERROR, payload: e });
});

export const performFavoriteDelete = (query, meta) => dispatch => dispatch({
  type: types.FAVORITE_DELETE,
  payload: Promise.all([
    dispatch(performAuthCheck()),
    api.favorite.delete(query)
  ]),
  meta
}).catch(e => {
  dispatch({ type: types.GLOBAL_ERROR, payload: e });
});
