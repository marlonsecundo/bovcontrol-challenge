import styled from 'styled-components/native';
import {StyledButton} from '../../../shared/components/buttons';
import {rfValuePX} from '../../../utils/responsive-fontsize';

export const StyledTextInput = styled.TextInput`
  background-color: ${({theme}) => theme.colors.card};

  border-radius: 5px;

  height: ${rfValuePX(35)};
`;

export const Label = styled.Text`
  font: ${({theme}) => theme.fonts.caption};
`;

export const ConfirmButton = styled(StyledButton)`
  width: 48%;
`;

export const GobackButton = styled(ConfirmButton)`
  background-color: ${({theme}) => theme.colors.text};
`;

export const DeleteButton = styled(ConfirmButton)`
  background-color: ${({theme}) => theme.colors.cancel};
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: column-reverse;
  min-height: ${rfValuePX(50)};
`;
