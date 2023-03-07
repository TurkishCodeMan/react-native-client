import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../api/client-types';

export async function setUserWithToken(
  value: Omit<User, 'id'> & {jwt?: string,password:string},
) {
  try {
    await AsyncStorage.setItem('user-with-token', JSON.stringify(value));
  } catch (error: unknown) {
    console.error(error);
  }
}
export async function getUserWithToken() {
  try {
    const jsonValue = await AsyncStorage.getItem('user-with-token');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error: unknown) {
    console.error(error);
  }
}
export async function removeUserWithToken() {
  try {
    return await AsyncStorage.removeItem('user-with-token');
  } catch (error: unknown) {
    console.error(error);
  }
}

export async function setStorageToken(value: string) {
  try {
    await AsyncStorage.setItem('token', JSON.stringify(value));
  } catch (error: unknown) {
    console.error(error);
  }
}
export async function getStorageToken() {
  try {
    const jsonValue = await AsyncStorage.getItem('token');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error: unknown) {
    console.error(error);
  }
}
export async function removeStorageToken() {
  try {
    return await AsyncStorage.removeItem('token');
  } catch (error: unknown) {
    console.error(error);
  }
}
