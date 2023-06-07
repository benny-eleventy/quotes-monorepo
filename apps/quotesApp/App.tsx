/* eslint-disable react/react-in-jsx-scope */
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import {SafeAreaView} from 'react-native';
import {store} from 'state';
import {Landing} from './src/components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView>
          <Landing />
        </SafeAreaView>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
