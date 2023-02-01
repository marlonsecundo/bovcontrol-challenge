import CheckBox from '@react-native-community/checkbox';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Checklist from '../../../database/models/checklist';
import {ButtonText} from '../../../shared/components/buttons';
import {ScreenContainer} from '../../../shared/components/screen-container';
import {Subtitle, Title} from '../../../shared/components/text';

import {
  Column,
  CustomContainer,
  Row,
  Spacer,
} from '../../../shared/styles/layout';
import ChecklistCard from '../components/checklist-card';
import {
  ConfirmButton,
  DeleteButton,
  GobackButton,
  Label,
  StyledTextInput,
} from '../styles/create-edit.styles';
import {Picker} from '@react-native-picker/picker';
import theme from '../../../shared/styles/theme';
import useCreateEditController from '../controllers/create-edit.controller';
import {Text} from 'react-native-svg';
import {ChecklistProvider} from '../contexts/checklist.context';

type Props = NativeStackScreenProps<{}>;

const CreateEditChecklistScreen: React.FC<Props> = ({route}) => {
  const checklist = Checklist.fromJSON(route?.params?.checklist);

  const controller = useCreateEditController(checklist);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenContainer>
        <Column flx={1}>
          <Title>
            {controller.farmerName === ''
              ? 'Create new checklist'
              : controller.farmerName}
          </Title>
          {controller.farmerName !== '' && (
            <Subtitle>{controller.farmerCity}</Subtitle>
          )}

          <Spacer mt="40px"></Spacer>

          <Label>Farmer name:</Label>
          <StyledTextInput
            onChangeText={newText => controller.setFarmerName(newText)}
            value={controller.farmerName}></StyledTextInput>

          <Spacer mt="10px"></Spacer>

          <Label>Farmer city:</Label>
          <StyledTextInput
            value={controller.farmerCity}
            onChangeText={newText =>
              controller.setFarmerCity(newText)
            }></StyledTextInput>

          <Spacer mt="10px"></Spacer>

          <Label>Farmer type:</Label>
          <Picker
            style={{
              width: '100%',
              height: 40,
              backgroundColor: theme.colors.card,
              marginBottom: 10,
            }}
            selectedValue={controller.type}
            onValueChange={itemValue => controller.setType(itemValue)}>
            <Picker.Item label="BPA" value="BPA" />
            <Picker.Item label="Antibiótico" value="Antibiótico" />
            <Picker.Item label="BPF" value="BPF" />
          </Picker>

          <Row>
            <Column flx={1}>
              <Label>Milk:</Label>
              <StyledTextInput
                onChangeText={newText =>
                  controller.setAmountOfMilkProduced(newText)
                }
                value={`${controller.amountOfMilkProduced}`}
                keyboardType="numeric"></StyledTextInput>
            </Column>

            <Spacer ml="20px"></Spacer>

            <Column flx={1}>
              <Label>Cows:</Label>
              <StyledTextInput
                value={`${controller.numberOfCowsHead}`}
                onChangeText={newText =>
                  controller.setNumberOfCowsHead(newText)
                }
                keyboardType="numeric"></StyledTextInput>
            </Column>
          </Row>

          <Spacer mt="20px"></Spacer>
          <Row algnI="center">
            <Label>Had Supervision</Label>
            <CheckBox
              value={controller.hadSupervision}
              onValueChange={newValue =>
                controller.setHadSupervision(newValue)
              }></CheckBox>
          </Row>

          <Spacer mt="20px"></Spacer>

          <Row>
            <Column flx={1}>
              <Label>From:</Label>
              <StyledTextInput
                value={`${controller.from}`}
                onChangeText={newText =>
                  controller.setFrom(newText)
                }></StyledTextInput>
            </Column>

            <Spacer ml="20px"></Spacer>

            <Column flx={1}>
              <Label>To:</Label>
              <StyledTextInput
                value={`${controller.to}`}
                onChangeText={newText =>
                  controller.setTo(newText)
                }></StyledTextInput>
            </Column>
          </Row>

          <Spacer mt="10px"></Spacer>

          <Row>
            <Column flx={1}>
              <Label>Latitude:</Label>
              <StyledTextInput
                onChangeText={newText => controller.setLatitude(newText)}
                value={`${controller.latitude}`}
                keyboardType="numeric"></StyledTextInput>
            </Column>

            <Spacer ml="20px"></Spacer>

            <Column flx={1}>
              <Label>Longitude:</Label>
              <StyledTextInput
                onChangeText={newText => controller.setLongitude(newText)}
                value={`${controller.longitude}`}
                keyboardType="numeric"></StyledTextInput>
            </Column>
          </Row>

          <CustomContainer flxDir="column-reverse" flx={1}>
            <Row jC="space-between">
              {checklist.hasID ? (
                <>
                  <ConfirmButton onPress={controller.handleUpdateButton}>
                    <ButtonText>Update</ButtonText>
                  </ConfirmButton>

                  <DeleteButton onPress={controller.handleDeleteButton}>
                    <ButtonText>Delete</ButtonText>
                  </DeleteButton>
                </>
              ) : (
                <>
                  <ConfirmButton onPress={controller.handleCreateButton}>
                    <ButtonText>Create</ButtonText>
                  </ConfirmButton>
                  <GobackButton onPress={controller.handleGobackButton}>
                    <ButtonText>Go back</ButtonText>
                  </GobackButton>
                </>
              )}
            </Row>
          </CustomContainer>
        </Column>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default props => (
  <ChecklistProvider>
    <CreateEditChecklistScreen {...props}></CreateEditChecklistScreen>
  </ChecklistProvider>
);
