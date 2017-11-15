import { TEST } from '../actions/types';

export default function authReducer (state = null, action) {
  switch (action.type) {
    case `${TEST}_FULFILLED`:
      return JSON.stringify(action.payload);
    default:
      return state;
  };
};
