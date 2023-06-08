/* eslint-disable react/react-in-jsx-scope */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { store } from 'state';
import { colors } from './src/components/themes';
import { PersonaForm } from './src/components/persona-form';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

const finalTheme = colors[0];

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={finalTheme}>
          <SafeAreaView>
            {/* <Landing /> */}
            <PersonaForm />
          </SafeAreaView>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
