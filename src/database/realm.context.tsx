import {createRealmContext} from '@realm/react';

import Realm from 'realm';
import Checklist from './models/checklist';

import {
  farmerSchema,
  fromSchema,
  locationSchema,
  toSchema,
} from './models/checklist';
import {OfflineAction} from './models/offline-action';

const config: Realm.Configuration = {
  schema: [
    OfflineAction.schema,
    Checklist.schema,
    farmerSchema,
    fromSchema,
    locationSchema,
    toSchema,
  ],
  schemaVersion: 15,
};

export const RealmContext = createRealmContext(config);

export const useRealm = RealmContext.useRealm;

export const RealmProvider = RealmContext.RealmProvider;
