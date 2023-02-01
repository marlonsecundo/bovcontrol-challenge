import styled from 'styled-components/native';
import {rfValuePX} from '../../utils/responsive-fontsize';

export const StyledButton = styled.TouchableOpacity`
  padding: ${rfValuePX(10)};

  background-color: ${({theme}) => theme.colors.primary};
  border-radius: 50px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font: ${({theme}) => theme.fonts.body};
  color: ${({theme}) => theme.colors.background};
`;
