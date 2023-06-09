import { PersonaForm } from './components/persona-form';
import { ToastMessage } from './components/toast-message';
import { useUiState } from './state';
import { useGetAll } from 'hooks';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setApiDetails, setDataStatus } from 'state';
import Personas from './components/personas';
import { FlexStartRowContainer } from '@bennyui/core';
import React from 'react';
import { useTheme } from 'styled-components';

function App() {
  const { toastMessages } = useUiState();

  const dispatch = useDispatch();

  useEffect(() => {
    const apiDetails = {
      baseURL: 'https://antilibrary-uat.deno.dev',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Source': 'QUOTES-WEB-APP',
      },
    };

    dispatch(setApiDetails(apiDetails));
  }, [dispatch]);

  const {
    isLoading: isLoadingPersonas,
    isSuccess: isSuccessPersonas,
    isError: isErrorPersonas,
  } = useGetAll({
    entity: 'personas',
  });

  React.useEffect(() => {
    dispatch(
      setDataStatus({
        entity: 'personas',
        status: {
          isLoading: isLoadingPersonas,
          isSuccess: isSuccessPersonas,
          isError: isErrorPersonas,
        },
      }),
    );
  }, [dispatch, isErrorPersonas, isLoadingPersonas, isSuccessPersonas]);

  useGetAll({
    entity: 'quotes',
  });

  const theme = useTheme();

  return (
    <>
      <FlexStartRowContainer
        width="90%"
        height="auto"
        padding="2rem"
        backgroundColor={theme && theme.color_800}>
        <Personas />
        <PersonaForm />
      </FlexStartRowContainer>
      {toastMessages?.length > 0 && <ToastMessage />}
    </>
  );
}

export default App;
