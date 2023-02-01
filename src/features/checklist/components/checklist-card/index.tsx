import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Checklist from '../../../../database/models/checklist';
import {Column, Row, Spacer} from '../../../../shared/styles/layout';
import {
  CardText,
  ChecklistType,
  Container,
  FarmerName,
  NumberCowsHead,
  Supervision,
} from './styles';

interface Props {
  checklist: Checklist;
}

const ChecklistCard: React.FC<Props> = ({checklist}) => {
  const navigation = useNavigation();

  const handleOnCardPress = () => {
    navigation.navigate('/checklist-item', {
      checklist: checklist.convertToJSON(),
    });
  };

  return (
    <TouchableOpacity onPress={handleOnCardPress}>
      <Container>
        <Row jC="space-between">
          <FarmerName>{checklist.farmer?.name}</FarmerName>
          <ChecklistType>{checklist.type}</ChecklistType>
        </Row>
        <Spacer mt="10px"></Spacer>
        <Column>
          <CardText>🥛 Milk: {checklist.amountOfMilkProduced}</CardText>
          <CardText>🐄 Cows: {checklist.numberOfCowsHead}</CardText>
          <CardText>
            🕵️ Supervision: {checklist.hadSupervision ? '✅' : '❌'}
          </CardText>
        </Column>
      </Container>
    </TouchableOpacity>
  );
};

export default ChecklistCard;
