import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { rootReducer } from 'state';
import { PersonaForm } from './persona-form';

const queryClient = new QueryClient();

const server = setupServer(
  rest.post(
    'https://antilibrary-uat.deno.dev/create/persona',
    async (req, res, ctx) => {
      // Check the request body to determine which response to return
      const requestBody = await req.json();
      if (requestBody.name === 'error') {
        // Return an error response
        return res(ctx.status(500), ctx.json({ error: 'An error occurred' }));
      } else {
        // Return a success response
        return res(
          ctx.json({
            results: {
              created: {
                result: '6481d0eedaa9db2226aacd58',
                displayOnFrontEnd: false,
                slug: 'tags',
                createdAt: '2023-06-08T13:00:30.017Z',
                updatedAt: '2023-06-08T13:00:30.017Z',
                role: 'Persona',
                name: 'Tags',
                imageUrls: [],
                _id: '6481d0eedaa9db2226aacd58',
              },
            },
            status: 'success',
          }),
        );
      }
    },
  ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('displays "Success" text when API call is successful', async () => {
  const store = configureStore({ reducer: rootReducer });

  const { getByText, getByPlaceholderText } = render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersonaForm />
      </QueryClientProvider>
    </Provider>,
  );

  fireEvent.changeText(getByPlaceholderText('Name'), 'success');
  fireEvent.changeText(getByPlaceholderText('Role'), 'Persona');

  fireEvent.press(getByText('Submit'));

  await waitFor(() => {
    expect(getByText('Success')).toBeTruthy();
  });
});

test('displays "Error" text when API call fails', async () => {
  const store = configureStore({ reducer: rootReducer });

  const { getByText, getByPlaceholderText } = render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersonaForm />
      </QueryClientProvider>
    </Provider>,
  );

  fireEvent.changeText(getByPlaceholderText('Name'), 'error');
  fireEvent.changeText(getByPlaceholderText('Role'), 'Persona');

  fireEvent.press(getByText('Submit'));

  await waitFor(() => {
    expect(getByText('Error')).toBeTruthy();
  });
});
