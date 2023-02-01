export type SyncStatus = 'synced' | 'waiting' | 'error';

export type ActionType = 'update' | 'create' | 'delete';

export class OfflineAction {
  _id?: string;
  type?: ActionType;
  payload: any;
  syncStatus?: SyncStatus;
  createdAt?: Date;

  static schema: Realm.ObjectSchema = {
    name: 'OfflineAction',
    primaryKey: '_id',
    properties: {
      _id: {
        type: 'uuid',
        indexed: true,
      },
      type: 'string',
      payload: 'string',
      syncStatus: 'string',
      createdAt: {
        type: 'date',
        default: new Date(),
      },
    },
  };

  static fromJSON(json): OfflineAction {
    const checklist = new OfflineAction();
    Object.assign(checklist, json);
    return checklist;
  }

  static fromJSONList(jsonList): OfflineAction[] {
    return jsonList.map(c => {
      const checklist = new OfflineAction();
      Object.assign(checklist, c);
      return checklist;
    });
  }
}
