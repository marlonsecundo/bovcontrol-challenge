import styled from 'styled-components/native';
import {StyledButton} from '../../../../shared/components/buttons';
import {rfValuePX} from '../../../../utils/responsive-fontsize';

export const Container = styled.View`
  width: 100%;

  align-items: center;
`;

export const CreateButton = styled(StyledButton)`
  width: ${rfValuePX(50)};
  height: ${rfValuePX(50)};

  align-items: center;
  justify-content: center;

  border-bottom-left-radius: 37px;

  border-bottom-right-radius: 37px;

  border-top-right-radius: 37px;
`;

export const PlusText = styled.Text`
  color: ${({theme}) => theme.colors.background};
  font-size: 32px;

  line-height: 30px;
  transform: translateY(3.1px);
`;
