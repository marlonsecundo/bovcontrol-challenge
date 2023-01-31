import {createRealmContext} from '@realm/react';
import Realm from 'realm';
import Checklist from './models/checklist';

import {
  farmerSchema,
  fromSchema,
  locationSchema,
  toSchema,
} from './models/checklist';

const config: Realm.Configuration = {
  schema: [
    Checklist.schema,
    farmerSchema,
    fromSchema,
    locationSchema,
    toSchema,
  ],
  schemaVersion: 2,
};

export const RealmContext = createRealmContext(config);

export const useRealm = RealmContext.useRealm;

export const RealmProvider = RealmContext.RealmProvider;
