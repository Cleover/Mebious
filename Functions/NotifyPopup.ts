import { ToastAndroid, Platform, Alert } from 'react-native';

const notifyPopup = (msg: string) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    Alert.alert(msg);
  }
}

const notifyNotImplemented = () => {
  const msg = "This feature is not yet implemented."
  notifyPopup(msg)
}


export {
  notifyPopup,
  notifyNotImplemented,
}