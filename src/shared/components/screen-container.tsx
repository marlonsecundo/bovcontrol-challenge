import styled from 'styled-components/native';
import {rfValuePX} from '../../utils/responsive-fontsize';

export const ScreenContainer = styled.View`
  padding: ${rfValuePX(40)} ${rfValuePX(25)};

  flex: 1;

  background-color: ${({theme}) => theme.colors.background};
`;
