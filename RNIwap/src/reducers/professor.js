import * as types from '../actions/types';
import _ from 'lodash';

let initialState = {
  error: false,
  isPending: false,
  data: null
};

export function professorSearch (state = initialState, action) {
  switch (action.type) {
    case `${types.PROFESSOR_SEARCH}_PENDING`:
      return Object.assign({}, state, { isPending: true });
    case `${types.PROFESSOR_SEARCH}_FULFILLED`:
      return Object.assign({}, state, { error: false, data: action.payload, isPending: false });
    case `${types.PROFESSOR_SEARCH}_REJECTED`:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    default:
      return state;
  };
};
