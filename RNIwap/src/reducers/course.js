import * as types from '../actions/types';
import _ from 'lodash';

let initialState = {
  error: false,
  isPending: false,
  data: null
};

export function courseSearch (state = initialState, action) {
  switch (action.type) {
    case `${types.COURSE_SEARCH}_PENDING`:
      return Object.assign({}, state, { isPending: true });
    case `${types.COURSE_SEARCH}_FULFILLED`:
      return Object.assign({}, state, { error: false, data: action.payload, isPending: false });
    case `${types.COURSE_SEARCH}_REJECTED`:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    default:
      return state;
  };
};

export function course (state = {}, action) {
  if (!action.payload || !action.payload.id) return state;
  let id = action.payload.id;
  switch (action.type) {
    case `${types.COURSE}_PENDING`:
      return Object.assign({}, state, { [id]: { isPending: true } });
    case `${types.COURSE}_FULFILLED`:
      return Object.assign({}, state, { [id]: { error: false, isPending: false, ...action.payload } });
    case `${types.COURSE}_REJECTED`:
      return Object.assign({}, state, { [id]: { error: action.payload, isPending: false } });
    default:
      return state;
  };
};
