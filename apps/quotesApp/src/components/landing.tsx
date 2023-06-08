import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { useGetAll } from 'hooks';
import { setApiDetails, usePersonaGlobalState } from 'state';

const Landing = () => {
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

  useGetAll({
    entity: 'personas',
  });

  const { results } = usePersonaGlobalState();
  return (
    <ThemedScrollView>
      {results.map((persona: any) => {
        return (
          <Card>
            <PersonaName>{persona.name}</PersonaName>
          </Card>
        );
      })}
    </ThemedScrollView>
  );
};

export { Landing };

const Card = styled.View`
  background-color: ${props => props.theme.color_100};
  padding: 20px;
  margin: 10px;
  border-radius: 10px;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 6;
  elevation: 2;
`;

const PersonaName = styled.Text`
  color: #1d3557;
  font-size: 20px;
  font-weight: bold;
`;

const ThemedScrollView = styled.ScrollView`
  background-color: ${props => props.theme.color_900};
`;
