import {Realm} from '@realm/react';
import {BaseModel} from '../models/base-model';

type RealmData = Record<string, unknown>;
const {UUID} = Realm.BSON;

export default class BaseRepository<Model extends BaseModel> {
  realm: Realm;

  schemaName: string;

  constructor(realm: Realm, schemaName: string) {
    this.realm = realm;
    this.schemaName = schemaName;
  }

  isEmpty = (): Promise<boolean> => {
    return new Promise(resolve => {
      const instances = this.realm.objects(this.schemaName);

      resolve(instances.length === 0);
    });
  };

  findAll = (): Promise<RealmData[]> => {
    return new Promise(resolve => {
      const instances = this.realm.objects(this.schemaName);

      resolve(instances.toJSON());
    });
  };

  create = (modelInstance: Model): Promise<Model> => {
    return new Promise(resolve => {
      this.realm.write(() => {
        const result = this.realm.create(this.schemaName, {
          ...modelInstance,
          _id: new UUID(),
        });

        resolve(result.toJSON() as any);
      });
    });
  };

  emptyAndCreate = async (modelInstances: Model[]) => {
    this.realm.write(() => {
      this.realm.delete(this.realm.objects(this.schemaName));
    });

    const promisses = Promise.all(modelInstances.map(r => this.create(r)));

    await promisses;
  };

  deleteBy_id = async (_id: string): Promise<number> => {
    const instance = await this.realm.objectForPrimaryKey(this.schemaName, _id);

    return new Promise(resolve => {
      this.realm.write(() => {
        this.realm.delete(instance);

        resolve(200);
      });
    });
  };
}
