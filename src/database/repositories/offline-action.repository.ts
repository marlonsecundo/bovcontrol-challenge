import {OfflineAction} from '../models/offline-action';

type RealmData = Record<string, unknown>;
const {UUID} = Realm.BSON;

class OfflineActionRepository {
  realm: Realm;
  constructor(realm: Realm) {
    this.realm = realm;
  }

  findAll = (): Promise<RealmData[]> => {
    return new Promise(resolve => {
      const offlineActions = this.realm.objects(OfflineAction.schema.name);

      resolve(offlineActions.toJSON());
    });
  };

  create = (offlineAction: OfflineAction): Promise<RealmData> => {
    return new Promise(resolve => {
      this.realm.write(() => {
        const result = this.realm.create(OfflineAction.schema.name, {
          ...offlineAction,
          _id: new UUID(),
        });

        resolve(result.toJSON());
      });
    });
  };

  update = async (data: OfflineAction): Promise<RealmData> => {
    const offlineAction = await this.realm.objectForPrimaryKey(
      OfflineAction.schema.name,
      data._id!,
    );

    return new Promise(resolve => {
      this.realm.write(() => {
        resolve(offlineAction!.toJSON());
      });
    });
  };

  delete = async (_id: string): Promise<number> => {
    const offlineAction = await this.realm.objectForPrimaryKey(
      OfflineAction.schema.name,
      _id,
    );

    return new Promise(resolve => {
      this.realm.write(() => {
        this.realm.delete(offlineAction);

        resolve(200);
      });
    });
  };
}

export default OfflineActionRepository;
