import Checklist from '../models/checklist';

type RealmData = Record<string, unknown>;
const {UUID} = Realm.BSON;

class ChecklistRepository {
  realm: Realm;
  constructor(realm: Realm) {
    this.realm = realm;
  }

  findAll = (): Promise<RealmData[]> => {
    return new Promise(resolve => {
      const checklists = this.realm.objects(Checklist.schema.name);

      resolve(checklists.toJSON());
    });
  };

  findById = (id: string): Promise<RealmData | null> => {
    return new Promise(resolve => {
      const items = this.realm
        .objects(Checklist.schema.name)
        .filtered('id == $0', id);

      if (items.length > 0) {
        return resolve(items[0].toJSON());
      }

      resolve(null);
    });
  };

  create = (checklist: Checklist): Promise<RealmData> => {
    return new Promise(resolve => {
      this.realm.write(() => {
        const result = this.realm.create(Checklist.schema.name, {
          ...checklist,
          _id: new UUID(),
        });

        resolve(result.toJSON());
      });
    });
  };

  update = async (data: Checklist): Promise<RealmData> => {
    const checklist = await this.findById(data.id ?? '-1');

    return new Promise(resolve => {
      this.realm.write(() => {
        checklist!.id = data.id;
        checklist!.amountOfMilkProduced = data.amountOfMilkProduced;
        checklist!.type = data.type;
        checklist!.numberOfCowsHead = data.numberOfCowsHead;
        checklist!.hadSupervision = data.hadSupervision;
        checklist!.farmer = data.farmer;
        checklist!.from = data.from;
        checklist!.to = data.to;
        checklist!.location = data.location;

        resolve(checklist!);
      });
    });
  };

  delete = async (id: string): Promise<number> => {
    const checklist = await this.findById(id);

    return new Promise(resolve => {
      this.realm.write(() => {
        this.realm.delete(checklist);

        resolve(200);
      });
    });
  };
}

export default ChecklistRepository;
