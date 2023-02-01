import styled from 'styled-components/native';

export const Title = styled.Text`
  font: ${({theme}) => theme.fonts.headline.default};
`;

export const Subtitle = styled.Text`
  font: ${({theme}) => theme.fonts.subheader};
`;
