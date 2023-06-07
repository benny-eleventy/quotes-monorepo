import {ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {useGetAll} from 'hooks';
import {useDispatch} from 'react-redux';
import {setApiDetails, usePersonaGlobalState} from 'state';
import styled from 'styled-components/native';

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

  const {results} = usePersonaGlobalState();
  console.log('Reactnative', results);
  return (
    <ScrollView>
      {results.map((persona: any) => {
        return (
          <Card>
            <PersonaName>{persona.name}</PersonaName>
          </Card>
        );
      })}
    </ScrollView>
  );
};

export {Landing};

const Card = styled.View`
  background-color: #a8dadc;
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
