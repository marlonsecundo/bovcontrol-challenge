import 'react-native-get-random-values';

import {ThemeProvider} from 'styled-components/native';
import Routes from './src/routes';
import theme from './src/shared/styles/theme';

import React from 'react';
import {RealmProvider} from './src/database/realm.context';
import {RepositoryProvider} from './src/database/repository.context';
import {ServiceProvider} from './src/shared/contexts/serivce.context';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';
import ConnectionBar from './src/shared/components/connection-bar';
import OfflineActionHandler from './src/shared/handlers/offline-action.handler';

export default function App() {
  // return <View></View>;

  return (
    <RealmProvider
      fallback={() => <View style={{backgroundColor: 'red', flex: 1}} />}>
      <RepositoryProvider>
        <ServiceProvider>
          <ThemeProvider theme={theme}>
            <ConnectionBar></ConnectionBar>
            <Routes></Routes>
            <Toast />
          </ThemeProvider>

          {/* HANDLERS */}

          <OfflineActionHandler></OfflineActionHandler>
        </ServiceProvider>
      </RepositoryProvider>
    </RealmProvider>
  );
}
