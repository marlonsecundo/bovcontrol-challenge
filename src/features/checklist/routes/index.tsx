import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ChecklistProvider} from '../contexts/checklist.context';
import CreateEditChecklistScreen from '../screens/create-edit-checklist.screen';
import FeedChecklistScreen from '../screens/feed-checklist.screen';

const Stack = createNativeStackNavigator();

export default (
  <Stack.Group key={'checklist.routes'}>
    <Stack.Screen
      name="/checklist"
      component={FeedChecklistScreen}
      options={{header: () => null}}
    />

    <Stack.Screen
      name="/checklist-item"
      component={CreateEditChecklistScreen}
      options={{header: () => null}}
    />
  </Stack.Group>
);
