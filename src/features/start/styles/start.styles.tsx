import styled from 'styled-components/native';
import {rfValuePX} from '../../../utils/responsive-fontsize';

export const Headline = styled.Text`
  font: ${({theme}) => theme.fonts.headline.default};
  font-family: 'Montserrat_600SemiBold';
  margin-top: ${rfValuePX(40)};
`;

export const Title = styled.Text`
  font: ${({theme}) => theme.fonts.body};
  font-family: 'Montserrat_600SemiBold';

  margin-left: ${rfValuePX(10)};
`;
