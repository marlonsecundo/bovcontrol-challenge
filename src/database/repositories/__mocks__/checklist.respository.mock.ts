import '@testing-library/jest-dom';
import Checklist from '~/database/models/checklist';
import {checklistMock} from '~/database/models/__mocks__/checklist.mock';
import ChecklistRepository from '../checklist.repository';

jest.mock('../checklist.repository', () => {
  return function (realm: Realm) {
    return {
      realm: realm,
      emptyAndCreate: () => Promise.resolve(),
      create: () => Promise.resolve(checklistMock),
      delete: () => Promise.resolve(200),
      findAll: () => Promise.resolve([]),
      findById: () => Promise.resolve(checklistMock),
      getIdBy_ID: () => Promise.resolve('1'),
      softDelete: () => Promise.resolve(200),
      update: () => Promise.resolve(checklistMock),
      deleteBy_id: () => Promise.resolve(200),
      findAllWithoutDeletion: () => Promise.resolve([]),
      isEmpty: () => Promise.resolve(false),
      schemaName: Checklist.schema.name,
    } as ChecklistRepository;
  };
});
