export const SET_USER = 'SET_USER';
export const RESET_USER = 'RESET_USER';

export const setUser = (user) => {
  return { type: SET_USER, user };
};

export const resetUser = () => {
  return { type: RESET_USER };
};