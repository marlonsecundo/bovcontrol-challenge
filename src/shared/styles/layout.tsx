import styled from 'styled-components/native';

interface ContainerProps {
  jC?: string;
  algnI?: string;
  flx?: number;
  mrg?: string;
  flxDir?: string;
}

interface SpacerProps {
  mt: string;
  mb: string;
  ml: string;
  mr: string;
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

export const Spacer = styled.View<SpacerProps>`
  ${({mt, mb, ml, mr}) => `
    margin-top: ${mt ?? '0px'};
    margin-bottom: ${mb ?? '0px'};
    margin-left: ${ml ?? '0px'};
    justify-right: ${mr ?? '0px'};
`}
`;
