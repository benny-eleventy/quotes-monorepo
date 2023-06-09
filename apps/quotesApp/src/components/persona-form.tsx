import React from 'react';
import { useCreateOne } from 'hooks';
import { Dimensions, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  usePersonaFormFields,
  updateField,
  useFormStatus,
  setFormStatus,
} from 'state';
import styled from 'styled-components/native';

const PersonaForm = () => {
  const dispatch = useDispatch();

  const persona = usePersonaFormFields();
  const { isSuccess, isError } = useFormStatus();

  const onCreateSuccess = (_data: any) => {
    console.log('onCreateSuccess');
    dispatch(
      setFormStatus({
        isLoading: false,
        isSuccess: true,
      }),
    );
  };

  const onCreateError = (_error: any) => {
    console.log('onCreateError');
    dispatch(
      setFormStatus({
        isLoading: false,
        isError: true,
      }),
    );
  };

  const { createOne: createPesrona } = useCreateOne({
    entity: 'persona',
    onCreateSuccess,
    onCreateError,
  });

  const handleSubmit = () => {
    console.log('persona submit', persona);
    createPesrona({ body: persona });
  };

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    //@ts-ignore
    console.log('handleChange', name, value);
    dispatch(updateField({ entity: 'persona', field: name, value }));
  };

  return (
    <FormContainer>
      <StyledTextInput
        placeholder="Name"
        value={persona.name}
        onChangeText={(text: string) =>
          handleChange({ name: 'name', value: text })
        }
      />
      <StyledTextInput
        placeholder="Role"
        value={persona.role}
        onChangeText={(text: string) =>
          handleChange({ name: 'role', value: text })
        }
      />
      <StyledButton onPress={handleSubmit}>
        <ButtonText>Submit</ButtonText>
      </StyledButton>
      {isSuccess && <Text>Success</Text>}
      {isError && <Text>Error</Text>}
    </FormContainer>
  );
};

export { PersonaForm };

const FormContainer = styled.View`
  padding: 20px;
  justify-content: center;
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  border-width: 1px;
  margin-bottom: 10px;
  padding: 10px;
`;

const StyledButton = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  width: 100%;
  align-self: center;
`;

const ButtonText = styled.Text`
  font-size: 16px;
`;
