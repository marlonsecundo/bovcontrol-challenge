import Checklist from '../models/checklist';
import {Realm} from '@realm/react';

type RealmData = Record<string, unknown>;
const {UUID} = Realm.BSON;

class ChecklistRepository {
  realm: Realm;
  constructor(realm: Realm) {
    this.realm = realm;
  }

  emptyAndCreate = async (checklists: Checklist[]) => {
    this.realm.write(() => {
      this.realm.delete(this.realm.objects(Checklist.schema.name));
    });

    const promisses = Promise.all(checklists.map(r => this.create(r)));

    const created = await promisses;

    checklists = checklists.map((c, index) => {
      c._id = created[index]._id as string;
      return c;
    });
  };

  findAll = (): Promise<RealmData[]> => {
    return new Promise(resolve => {
      const checklists = this.realm
        .objects(Checklist.schema.name)
        .filtered('deletedAt == null');

      resolve(checklists.toJSON());
    });
  };

  getIdBy_ID = (_id: string): Promise<string | null> => {
    return new Promise(resolve => {
      const items = this.realm
        .objects<Checklist>(Checklist.schema.name)
        .filtered(`_id == uuid(${_id})`);

      if (items.length > 0) {
        return resolve(items[0].id ?? null);
      }

      return resolve(null);
    });
  };

  findById = (checklist: Checklist): Promise<any | null> => {
    return new Promise(resolve => {
      if (checklist._id) {
        const items = this.realm
          .objects<Checklist>(Checklist.schema.name)
          .filtered(`_id == uuid(${checklist._id})`);

        if (items.length > 0) return resolve(items[0]);
      }

      if (checklist.id) {
        const items = this.realm
          .objects<Checklist>(Checklist.schema.name)
          .filtered('id == $0', checklist.id);

        if (items.length > 0) return resolve(items[0]);
      }

      resolve(null);
    });
  };

  create = (checklist: Checklist): Promise<Checklist> => {
    return new Promise(resolve => {
      this.realm.write(() => {
        const result = this.realm.create(Checklist.schema.name, {
          ...checklist,
          _id: new UUID(),
        });

        resolve(result.toJSON() as any);
      });
    });
  };

  update = async (data: Checklist): Promise<Checklist> => {
    const realmData = await this.findById(data);

    return new Promise(resolve => {
      this.realm.write(() => {
        realmData!.id = data.id;
        realmData!.amountOfMilkProduced = data.amountOfMilkProduced;
        realmData!.type = data.type;
        realmData!.numberOfCowsHead = data.numberOfCowsHead;
        realmData!.hadSupervision = data.hadSupervision;
        realmData!.farmer = data.farmer;
        realmData!.from = data.from;
        realmData!.to = data.to;
        realmData!.location = data.location;
        realmData!.updatedAt = new Date();

        resolve(realmData!.toJSON());
      });
    });
  };

  softDelete = async (data: Checklist): Promise<number> => {
    const realmData = await this.findById(data);

    return new Promise(resolve => {
      this.realm.write(() => {
        realmData!.deletedAt = new Date();
        resolve(200);
      });
    });
  };

  delete = async (data: Checklist): Promise<number> => {
    const checklist = await this.findById(data);

    return new Promise(resolve => {
      this.realm.write(() => {
        this.realm.delete(checklist);

        resolve(200);
      });
    });
  };
}

export default ChecklistRepository;
