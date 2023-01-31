import Checklist from '../models/checklist';

type findReturn = (Checklist & Realm.Object<unknown, never>) | null;
type findAllReturn = Realm.Results<Checklist & Realm.Object<unknown, never>>;

class ChecklistRepository {
  realm: Realm;
  constructor(realm: Realm) {
    this.realm = realm;
  }

  findAll = (): Promise<findAllReturn> => {
    return new Promise(resolve => {
      const checklists = this.realm.objects<Checklist>(Checklist.schema.name);

      resolve(checklists);
    });
  };

  findById = (_id: Realm.BSON.ObjectId): Promise<findReturn> => {
    return new Promise(resolve => {
      const checklists = this.realm.objectForPrimaryKey<Checklist>(
        Checklist.schema.name,
        _id,
      );

      resolve(checklists);
    });
  };

  create = (checklist: Checklist): Promise<Checklist> => {
    return new Promise(resolve => {
      this.realm.write(() => {
        const result = this.realm.create<Checklist>(
          Checklist.schema.name,
          checklist,
        );

        resolve(result);
      });
    });
  };

  update = async (data: Checklist): Promise<Checklist> => {
    const checklist = await this.findById(
      data._id ?? new Realm.BSON.ObjectId('-1'),
    );

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

  delete = async (id: Realm.BSON.ObjectId) => {
    const checklist = await this.findById(id);

    return new Promise(resolve => {
      this.realm.write(() => {
        this.realm.delete(checklist);

        resolve(null);
      });
    });
  };
}

export default ChecklistRepository;
