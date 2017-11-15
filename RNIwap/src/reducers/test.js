import { TEST } from '../actions/types';
import _ from 'lodash';

let initialState = {
  error: false,
  isPending: false,
  data: null
};

export default function testReducer (state = initialState, action) {
  switch (action.type) {
    case `${TEST}_PENDING`:
      return Object.assign({}, state, { isPending: true });
    case `${TEST}_FULFILLED`:
      return Object.assign({}, state, { error: false, data: JSON.stringify(action.payload), isPending: false });
    case `${TEST}_REJECTED`:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    default:
      return state;
  };
};
