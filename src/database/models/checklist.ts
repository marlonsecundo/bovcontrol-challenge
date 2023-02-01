import Realm from 'realm';
import snakecaseKeys from 'snakecase-keys';
import 'react-native-get-random-values';

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
  _id?: string;
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
  createdAt?: Date;
  updatedAt?: Date;

  get hasID() {
    return !!(this.id || this._id);
  }

  static schema: Realm.ObjectSchema = {
    name: 'Checklist',
    primaryKey: '_id',
    properties: {
      _id: {
        type: 'uuid',
        indexed: true,
      },
      id: {
        type: 'string',
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
      createdAt: 'date',
      updatedAt: 'date',
    },
  };

  toJsonAPI() {
    return snakecaseKeys(this);
  }

  convertToJSON() {
    return JSON.stringify(this);
  }

  static fromJSON(json): Checklist {
    let data;
    if (typeof json === 'string') data = JSON.parse(json);
    else data = json;

    const checklist = new Checklist();
    Object.assign(checklist, data);
    return checklist;
  }

  static fromJSONList(jsonList): Checklist[] {
    return jsonList.map(c => {
      const checklist = new Checklist();
      Object.assign(checklist, c);
      return checklist;
    });
  }

  static generateDefault() {
    return Checklist.fromJSON({
      id: '',
      type: 'BPA',
      amountOfMilkProduced: 0,
      numberOfCowsHead: 0,
      hadSupervision: false,
      farmer: {name: '', city: ''},
      from: {name: ''},
      to: {name: ''},
      location: {latitude: 0, longitude: 0},
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}

export default Checklist;
