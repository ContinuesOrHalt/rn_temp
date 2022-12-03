import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';
import ModalLoading from './src/components/ModalLoading';

import useColorScheme from './src/hooks/useColorScheme';
import useInitApp from './src/hooks/useInitApp';
import I18nProvider from './src/intl/I18nProvider';
import Navigation from './src/navigation';
import SplashScreen from './src/screens/splash/SplashScreen';
import {store} from './src/stores';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function App() {
  const colorScheme = useColorScheme();
  const isLoadingInitComplete = useInitApp();

  if (!isLoadingInitComplete) {
    return <SplashScreen />;
  }

  return (
    <Provider store={store}>
      <I18nProvider>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            {/* <StatusBar /> */}
            <ModalLoading />
          </SafeAreaProvider>
        </QueryClientProvider>
      </I18nProvider>
    </Provider>
  );
}
