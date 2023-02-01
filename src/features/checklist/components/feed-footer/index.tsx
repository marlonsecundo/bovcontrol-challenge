import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import Checklist from '../../../../database/models/checklist';
import {Container, CreateButton, PlusText} from './styles';

const FeedFooter: React.FC = () => {
  const navigation = useNavigation();

  const handleCreateButton = () => {
    navigation.navigate('/checklist-item', {
      checklist: Checklist.generateDefault().convertToJSON(),
    });
  };

  return (
    <Container>
      <CreateButton onPress={handleCreateButton}>
        <PlusText>+</PlusText>
      </CreateButton>
    </Container>
  );
};

export default FeedFooter;
