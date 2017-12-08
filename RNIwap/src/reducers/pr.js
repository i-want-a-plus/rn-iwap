import * as types from '../actions/types';
import _ from 'lodash';

export function pr (state = {}, action) {
  if (!action.meta) return state;
  let id = action.meta.id;
  switch (action.type) {
    case `${types.COMMENT_SUBMIT}_PENDING`:
    case `${types.COMMENT_UPDATE}_PENDING`:
      return Object.assign({}, state, { [id]: { isPending: true } });
    case `${types.COMMENT_SUBMIT}_FULFILLED`:
    case `${types.COMMENT_UPDATE}_FULFILLED`:
      return Object.assign({}, state, { [id]: { error: false, isPending: false, data: action.payload || true } });
    case `${types.COMMENT_SUBMIT}_REJECTED`:
    case `${types.COMMENT_UPDATE}_REJECTED`:
      return Object.assign({}, state, { [id]: { error: action.payload, isPending: false } });
    default:
      return state;
  };
};
