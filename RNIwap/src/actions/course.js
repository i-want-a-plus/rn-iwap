import * as types from './types';
import { api } from '../services';
import { performAuthCheck } from './auth';

export const performCourseSearch = query => dispatch => dispatch({
  type: types.COURSE_SEARCH,
  payload: api.fetchCourseList(query)
}).catch(e => {
  dispatch({ type: types.GLOBAL_ERROR, payload: e });
});

export const performCourseFetch = query => dispatch => dispatch({
  type: types.COURSE,
  payload: api.fetchCourse(query)
}).catch(e => {
  dispatch({ type: types.GLOBAL_ERROR, payload: e });
});
