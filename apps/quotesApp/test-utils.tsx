import { render as rtlRender } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureStore } from '@reduxjs/toolkit';
import React from 'react';

import { rootReducer } from 'state';
import { RootState } from 'state';

const queryClient = new QueryClient();

function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState: preloadedState as RootState,
    }),
    ...renderOptions
  }: { preloadedState?: RootState; store?: any; renderOptions?: any } = {},
) {
  function Wrapper({ children }: { children?: React.ReactNode }) {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react-native';
// override render method
export { renderWithProviders as render };
