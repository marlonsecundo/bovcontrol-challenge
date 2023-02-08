import '@testing-library/jest-dom';
import ChecklistRepository from '../repositories/checklist.repository';

jest.mock('../repository.context', () => {
  return {
    useRepository: () => ({
      checklistRepository: new ChecklistRepository({} as Realm),
    }),
  };
});
