import '@testing-library/jest-dom';
import Checklist from '~/database/models/checklist';
import {checklistMock} from '~/database/models/__mocks__/checklist.mock';
import API from '../api';
import ChecklistService from '../checklist.service';

jest.mock('../checklist.service', () => {
  return function (api: API) {
    return {
      create: () => Promise.resolve(checklistMock),
      delete: () => Promise.resolve(200),
      findAll: () => Promise.resolve([checklistMock]),
      update: (checklist: Checklist) => Promise.resolve(checklist),
      api: api,
      axiosAPI: api.axiosApi,
    } as ChecklistService;
  };
});
