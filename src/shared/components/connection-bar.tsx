import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {rfValuePX} from '../../utils/responsive-fontsize';
import {useIsOffline} from '../hooks/useIsOffline';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  padding: ${rfValuePX(10)};
`;

export const Text = styled.Text``;

const ConnectionBar: React.FC = () => {
  const isOffline = useIsOffline();

  const text = isOffline ? 'Diconnected' : 'Back online!';

  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
};

export default ConnectionBar;
