/* eslint-disable react/react-in-jsx-scope */
import { useCreateOne } from 'hooks';
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { usePersonaFormFields, updateField } from 'state';
import styled from 'styled-components/native';

const PersonaForm = () => {
  const dispatch = useDispatch();

  const persona = usePersonaFormFields();

  const onCreateSuccess = (_data: any) => {
    console.log('onCreateSuccess');
  };

  const { createOne: createPesrona } = useCreateOne({
    entity: 'persona',
    onCreateSuccess,
  });

  const handleSubmit = () => {
    console.log('persona submit', persona);
    createPesrona({ body: persona });
  };

  const handleChange = ({ name, value }: { name: string; value: string }) => {
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
    </FormContainer>
  );
};

export { PersonaForm };

const FormContainer = styled.View`
  height: ${Dimensions.get('window').height}px;
  padding: 20px;
  justify-content: center;
  background-color: ${props => props.theme.color_800};
`;

const StyledTextInput = styled.TextInput`
  height: 40px;
  border-color: ${props => props.theme.color_200};
  border-width: 1px;
  margin-bottom: 10px;
  padding: 10px;
  color: ${props => props.theme.white_color};
`;

const StyledButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.color_400};
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  width: 100%;
  align-self: center;
`;

const ButtonText = styled.Text`
  color: ${props => props.theme.color_800};
  font-size: 16px;
`;
