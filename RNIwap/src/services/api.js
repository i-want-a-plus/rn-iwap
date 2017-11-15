import Network from './network';

export const fetchTest = () => Network('test').get();
export const fetchTestWillFail = () => Network('test').post();
