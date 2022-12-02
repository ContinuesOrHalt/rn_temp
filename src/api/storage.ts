import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from 'react-query';

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('😡coh / file: storage.ts:8 / e', e);
    // saving error
  }
};
const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('😡coh / file: storage.ts:8 / e', e);
    // saving error
  }
};

export const getAsyncStorage = async (storageKey: string) => {
  try {
    const value = await AsyncStorage.getItem(storageKey);
    return value;
  } catch (e) {
    // error reading value
    return null;
  }
};

export const useAsyncStorage = (storageKey: string) => {
  const data = useQuery(['LOCAL_STORAGE', storageKey], () =>
    getAsyncStorage(storageKey),
  );

  return [
    data,
    async (v: string) => {
      await storeData(storageKey, v);
      data.refetch();
    },
    async () => {
      await removeData(storageKey);
      data.refetch();
    },
  ];
};
