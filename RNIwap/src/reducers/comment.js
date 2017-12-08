import * as types from '../actions/types';
import _ from 'lodash';

export function comment (state = {}, action) {
  if (!action.meta) return state;
  let id = `${action.meta.type}_${action.meta.id}`;
  switch (action.type) {
    case `${types.COMMENT_FETCH}_PENDING`:
      return Object.assign({}, state, { [id]: { isPending: true } });
    case `${types.COMMENT_FETCH}_FULFILLED`:
      return Object.assign({}, state, { [id]: { error: false, isPending: false, data: action.payload } });
    case `${types.COMMENT_FETCH}_REJECTED`:
      return Object.assign({}, state, { [id]: { error: action.payload, isPending: false } });
    default:
      return state;
  };
};

export function myComment (state = {}, action) {
  switch (action.type) {
    case `${types.MY_COMMENT_FETCH}_FULFILLED`:
      let newState = {};
      _.each(action.payload, c => {
        _.set(newState, c.id, c);
      });
      return newState;
    case `${types.COMMENT_SUBMIT}_FULFILLED`:
      id = action.payload.id;
      return Object.assign({}, state, { [id]: { ...action.payload } });
    case `${types.COMMENT_DELETE}_FULFILLED`:
      return _.omit(state, action.meta.id);
    default:
      return state;
  };
}

