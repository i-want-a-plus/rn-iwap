import Network from './network';

export const fetchUserRegister = user => Network('user').post(null, null, user);
export const fetchUserLogin = user => Network('user/login').post(null, null, user);

export const fetchCourse = query => Network('course/{id}').get(query);
export const fetchCourseList = query => Network('course').get(null, query);

export const fetchProfessor = query => Network('professor/{id}').get(query);
export const fetchProfessorList = query => Network('professor/ac').get(null, query);
