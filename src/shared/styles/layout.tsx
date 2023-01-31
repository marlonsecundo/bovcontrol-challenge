import styled from 'styled-components/native';

interface ContainerProps {
  jC?: string;
  algnI?: string;
  flx?: number;
  mrg?: string;
  flxDir?: string;
}

export const CustomContainer = styled.View<ContainerProps>`
  ${({jC, algnI, flx, mrg, flxDir}) => `
  justify-content: ${jC ?? 'flex-start'};
  align-items: ${algnI ?? 'stretch'};
  flex: ${flx ?? 'none'};
  margin: ${mrg ?? '0px'};
  flex-direction: ${flxDir ?? 'row'}
`}
`;

export const Row = styled(CustomContainer)`
  flex-direction: row;
`;

export const Column = styled(CustomContainer)`
  flex-direction: column;
`;
