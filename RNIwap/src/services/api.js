import Network from './network';

export const fetchUserLogin = user => Network('user/login').post(null, user);

export const fetchTest = () => Network('test').get();
export const fetchTestWillFail = () => Network('test').post();
