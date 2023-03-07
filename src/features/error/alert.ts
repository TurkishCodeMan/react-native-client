import {Alert as Noty} from 'react-native';

export function handler(error: Error, title: string) {
  return Noty.alert(title, error.message, [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
}
