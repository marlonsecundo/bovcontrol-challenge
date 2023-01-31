import styled from "styled-components/native";
import { rfValuePX } from "../../../utils/responsive-fontsize";

export const Container = styled.View`
  padding: ${rfValuePX(40)} ${rfValuePX(25)};

  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Headline = styled.Text`
  font: ${({ theme }) => theme.fonts.headline.default};
  font-family: "Montserrat_600SemiBold";
  margin-top: ${rfValuePX(40)};
`;

export const Title = styled.Text`
  font: ${({ theme }) => theme.fonts.body};
  font-family: "Montserrat_600SemiBold";

  margin-left: ${rfValuePX(10)};
`;

export const StartButton = styled.TouchableOpacity`
  padding: ${rfValuePX(10)};

  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  align-items: center;
`;

export const StartText = styled.Text`
  font: ${({ theme }) => theme.fonts.body};
`;
