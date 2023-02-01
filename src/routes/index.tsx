import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React, {useContext} from 'react';
import {lightTheme} from '../shared/styles/theme';

import StartRoutes from '../features/start/routes';
import ChecklistRoutes from '../features/checklist/routes';

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="/start">
        {[StartRoutes, ChecklistRoutes]}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
