import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';

import StartRoutes from '../features/start/routes';
import ChecklistRoutes from '../features/checklist/routes';
import {ChecklistProvider} from '~/features/checklist/contexts/checklist.context';
import ChecklistContextHandler from '~/shared/handlers/checklist-context.handler';

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  const checklistStackRoutes = (
    <ChecklistProvider>
      <Stack.Navigator initialRouteName="/start">
        {[StartRoutes, ChecklistRoutes]}
      </Stack.Navigator>

      <ChecklistContextHandler></ChecklistContextHandler>
    </ChecklistProvider>
  );

  return <NavigationContainer>{checklistStackRoutes}</NavigationContainer>;
};

export default Routes;
