import '@testing-library/jest-dom';
import {checklistMock} from '~/database/models/__mocks__/checklist.mock';
import API from '../api';

jest.mock('../checklist.service', () => {
  return function (api: API) {
    return {
      create: () => Promise.resolve(checklistMock),
      delete: () => Promise.resolve(200),
      findAll: () => Promise.resolve([checklistMock]),
      update: () => Promise.resolve(checklistMock),
      api: api,
      axiosAPI: api.axiosApi,
    };
  };
});
