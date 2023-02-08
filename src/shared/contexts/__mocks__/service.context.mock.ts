import '@testing-library/jest-dom';
import API from '~/shared/services/api';
import ChecklistService from '~/shared/services/checklist.service';

jest.mock('../service.context', () => {
  return {
    useService: () => ({
      checklistService: new ChecklistService(new API()),
    }),
  };
});
