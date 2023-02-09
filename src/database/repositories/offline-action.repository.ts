import {OfflineAction} from '../models/offline-action';
import {Realm} from '@realm/react';
import BaseRepository from './base-respository';

type RealmData = Record<string, unknown>;
const {UUID} = Realm.BSON;

class OfflineActionRepository extends BaseRepository<OfflineAction> {
  realm: Realm;
  constructor(realm: Realm) {
    super(realm, OfflineAction.schema.name);
    this.realm = realm;
  }
}

export default OfflineActionRepository;
