import Realm from 'realm';
import snakecaseKeys from 'snakecase-keys';

export const farmerSchema = {
  name: 'farmer',
  embedded: true,
  properties: {
    name: 'string',
    city: 'string',
  },
};

export const fromSchema = {
  name: 'from',
  embedded: true,
  properties: {
    name: 'string',
  },
};

export const toSchema = {
  name: 'to',
  embedded: true,
  properties: {
    name: 'string',
  },
};

export const locationSchema = {
  name: 'location',
  embedded: true,
  properties: {
    latitude: 'double',
    longitude: 'double',
  },
};

class Checklist {
  _id?: Realm.BSON.ObjectId;
  id?: string;
  type?: string;
  amountOfMilkProduced?: number;
  numberOfCowsHead?: number;
  hadSupervision?: boolean;
  farmer?: {
    name: string;
    city: string;
  };
  from?: {
    name: string;
  };
  to?: {
    name: string;
  };
  location?: {
    latitude: number;
    longitude: number;
  };
  created_at?: Date;
  updated_at?: Date;

  // constructor(
  //   type: string,
  //   amountOfMilkProduced: number,
  //   numberOfCowsHead: number,
  //   hadSupervision: boolean,
  //   farmer: {name: string; city: string},
  //   from: {name: string},
  //   to: {name: string},
  //   location: {
  //     latitude: number;
  //     longitude: number;
  //   },
  //   created_at: Date,
  //   updated_at: Date,
  //   id: string = '',
  //   _id?: Realm.BSON.ObjectId,
  // ) {
  //   this._id = _id;
  //   this.id = id;
  //   this.type = type;
  //   this.amountOfMilkProduced = amountOfMilkProduced;
  //   this.numberOfCowsHead = numberOfCowsHead;
  //   this.hadSupervision = hadSupervision;
  //   this.farmer = farmer;
  //   this.from = from;
  //   this.to = to;
  //   this.location = location;
  //   this.created_at = created_at;
  //   this.updated_at = updated_at;
  // }

  static schema: Realm.ObjectSchema = {
    name: 'Checklist',
    primaryKey: '_id',
    properties: {
      _id: {
        type: 'objectId',
        indexed: true,
        default: new Realm.BSON.ObjectId(),
      },
      id: {
        type: 'int',
        optional: true,
      },
      type: 'string',
      amountOfMilkProduced: 'double',
      numberOfCowsHead: 'int',
      hadSupervision: 'bool',
      farmer: 'farmer',
      from: 'from',
      to: 'to',
      location: 'location',
      created_at: 'date',
      updated_at: 'date',
    },
  };

  toJsonAPI() {
    return snakecaseKeys(this);
  }

  static fromJSON(json): Checklist {
    const checklist = new Checklist();
    Object.assign(checklist, json);
    return checklist;
  }
}

export default Checklist;
