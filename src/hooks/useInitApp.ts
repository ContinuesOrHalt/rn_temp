import {getAsyncStorage} from '../api/storage';
import {setTokenApi} from '../config/axios';
import {useEffect, useState} from 'react';

export default function useInitApp() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        const token = await getAsyncStorage('token');

        if (token) {
          setTokenApi(token);
        }
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
