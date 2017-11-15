import { Toast } from 'native-base';

export default (message) => {
  Toast.show({
    text: message,
    position: 'top',
    buttonText: 'Okay',
    type: 'danger',
    duration: 2000
  });
};
