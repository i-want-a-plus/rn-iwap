import * as types from '../actions/types';
import _ from 'lodash';

export function favorite (state = {}, action) {
  let id;
  switch (action.type) {
    case `${types.FAVORITE_FETCH}_FULFILLED`:
      let newState = {};
      _.each(action.payload, (f) => {
          if (_.get(f, 'Course.id')) _.set(newState, `course_${f.Course.id}`, f);
          if (_.get(f, 'Professor.id')) _.set(newState, `professor_${f.Professor.id}`, f);
          if (_.get(f, 'Section.id')) _.set(newState, `section_${f.Section.id}`, f);
      });
      return newState;
    case `${types.FAVORITE_ADD}_FULFILLED`:
      id = `${action.meta.type}_${action.meta.id}`;
      return Object.assign({}, state, { [id]: { ...action.payload } });
    case `${types.FAVORITE_DELETE}_FULFILLED`:
      id = `${action.meta.type}_${action.meta.id}`;
      return Object.assign({}, state, { [id]: null });
    default:
      return state;
  };
};
