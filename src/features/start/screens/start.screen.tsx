import React from 'react';
import {View, Text, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BovControlIcon from '../../../assets/icons/bovcontrol-icon';
import Checklist from '../../../database/models/checklist';
import {useService} from '../../../shared/contexts/serivce.context';
import {Column, CustomContainer, Row} from '../../../shared/styles/layout';
import {
  ChecklistProvider,
  useChecklist,
} from '../../checklist/contexts/checklist.context';
import {
  Container,
  Headline,
  StartButton,
  StartText,
  Title,
} from '../styles/start.styles';

const StartScreen: React.FC = () => {
  const {create, findAll, destroy, update, findById} = useChecklist();

  const {checklistService} = useService();

  const handleStartButton = async () => {};

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
        <Column flx={1}>
          <Row algnI="center" style={{}}>
            <BovControlIcon width={35} height={35}></BovControlIcon>
            <Title>Bov Control</Title>
          </Row>

          <Headline>Desafio Mobile Checklist Farmer</Headline>

          <CustomContainer flx={1} flxDir="column-reverse">
            <StartButton onPress={handleStartButton}>
              <StartText>Start</StartText>
            </StartButton>
          </CustomContainer>
        </Column>
      </Container>
    </SafeAreaView>
  );
};

export default () => {
  return (
    <ChecklistProvider>
      <StartScreen></StartScreen>
    </ChecklistProvider>
  );
};
