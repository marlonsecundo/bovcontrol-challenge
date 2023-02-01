import styled from 'styled-components/native';
import {rfValuePX} from '../../../../utils/responsive-fontsize';

export const Container = styled.View`
  background-color: ${({theme}) => theme.colors.card};

  border-radius: 20px;
  padding: ${rfValuePX(15)};

  margin-top: 30px;
`;

export const FarmerName = styled.Text`
  font: ${({theme}) => theme.fonts.body};
  font-weight: 900;
`;

export const ChecklistType = styled.Text`
  font: ${({theme}) => theme.fonts.body};
`;

export const CardText = styled.Text`
  font: ${({theme}) => theme.fonts.caption};
  margin-bottom: ${rfValuePX(5)};
`;

export const NumberCowsHead = styled.Text``;

export const Supervision = styled.Text``;
