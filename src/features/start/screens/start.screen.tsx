import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useService} from '~/shared/contexts/service.context';
import BovControlIcon from '../../../assets/icons/bovcontrol-icon';
import {ButtonText, StyledButton} from '../../../shared/components/buttons';
import {ScreenContainer} from '../../../shared/components/screen-container';
import {Column, CustomContainer, Row} from '../../../shared/styles/layout';
import {ChecklistProvider} from '../../checklist/contexts/checklist.context';
import {Headline, Title} from '../styles/start.styles';

const StartScreen: React.FC = () => {
  const navigation = useNavigation();

  const {checklistService} = useService();

  const handleStartButton = async () => {
    navigation.navigate('/checklist', {});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenContainer>
        <Column flx={1}>
          <Row algnI="center" style={{}}>
            <BovControlIcon width={35} height={35}></BovControlIcon>
            <Title>Bov Control</Title>
          </Row>

          <Headline>Desafio Mobile Checklist Farmer</Headline>

          <CustomContainer flx={1} flxDir="column-reverse">
            <StyledButton onPress={handleStartButton}>
              <ButtonText>Start</ButtonText>
            </StyledButton>
          </CustomContainer>
        </Column>
      </ScreenContainer>
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
