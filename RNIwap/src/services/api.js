import Network from './network';

export const fetchUserRegister = user => Network('user').post(null, null, user);
export const fetchUserLogin = user => Network('user/login').post(null, null, user);
export const user = {
  comment: () => Network('user/comment').get()
};

export const fetchCourse = query => Network('course/{id}').get(query);
export const fetchCourseList = query => Network('course').get(null, query);

export const fetchProfessor = query => Network('professor/{id}').get(query);
export const fetchProfessorList = query => Network('professor/ac').get(null, query);

export const fetchComment = query => Network('{type}/{id}/comment').get(query);
export const postComment = query => Network('comment').post(null, query, query);
export const comment = {
  delete: query => Network('comment{/id}').delete(query)
};

export const fetchFavorite = query => Network('user/favorite').get();

export const favorite = {
  fetch: () => Network('user/favorite').get(),
  add: query => Network('favorite').post(null, query, query),
  delete: query => Network('favorite{/id}').delete(query)
};
