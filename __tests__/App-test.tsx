/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {RealmProvider} from '../src/database/realm.context';
import {View} from 'react-native';

it('renders correctly', () => {
  renderer.create(
    <RealmProvider>
      <View></View>
    </RealmProvider>,
  );
});
