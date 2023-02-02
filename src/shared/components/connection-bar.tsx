import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';
import styled from 'styled-components/native';
import {rfValuePX} from '../../utils/responsive-fontsize';
import {useIsOffline} from '../hooks/useIsOffline';

export const Container = styled(Animated.View)`
  justify-content: center;
  align-items: center;
  padding: ${rfValuePX(10)};

  background-color: ${({isOffline}) => (isOffline ? 'red' : 'green')};

  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
`;

export const Text = styled.Text`
  color: white;
`;

const ConnectionBar: React.FC = () => {
  const showAnim = useRef(new Animated.Value(-50)).current; // Initial value for opacity: 0
  const isOffline = useIsOffline();

  useEffect(() => {
    if (isOffline)
      Animated.timing(showAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    else {
      Animated.timing(showAnim, {
        toValue: -50,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }
  }, [showAnim, isOffline]);

  const text = isOffline ? 'Diconnected' : 'Back online!';
  <Animated.View
    style={{
      height: 10,
      transform: [
        {
          translateY: showAnim,
        },
      ],
    }}></Animated.View>;
  return (
    <Container
      style={{
        transform: [
          {
            translateY: showAnim,
          },
        ],
      }}
      isOffline={isOffline}>
      <Text>{text}</Text>
    </Container>
  );
};

export default ConnectionBar;
