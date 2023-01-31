import React, {createContext, useContext, useState} from 'react';
import Checklist from '../../../database/models/checklist';
import {useRepository} from '../../../database/repository.context';
import {useService} from '../../../shared/contexts/serivce.context';

interface ProviderProps {
  children?: React.ReactNode;
}

interface ChecklistContextProps {
  checklist: Checklist[];

  create: (checklist: Checklist) => Promise<Checklist>;
  findAll: () => Promise<Checklist[]>;
  update: (checklist: Checklist) => Promise<Checklist>;
  destroy: (_id: Realm.BSON.ObjectId) => void;
  findById: (_id: Realm.BSON.ObjectId) => Promise<Checklist>;
}

const ChecklistContext = createContext<ChecklistContextProps>(
  {} as ChecklistContextProps,
);

export const ChecklistProvider: React.FC<ProviderProps> = ({children}) => {
  const [checklist, setChecklists] = useState([]);

  const {checklistService} = useService();
  const {checklistRepository} = useRepository();

  const create = async (checklist: Checklist): Promise<Checklist> => {
    const newChecklist = await checklistRepository.create(checklist);

    return newChecklist;
  };

  const findAll = async (): Promise<Checklist[]> => {
    const result = await checklistRepository.findAll();

    return result as unknown as Checklist[];
  };

  const findById = async (_id: Realm.BSON.ObjectId): Promise<Checklist> => {
    const result = await checklistRepository.findById(_id);

    return result as Checklist;
  };

  const destroy = async (_id: Realm.BSON.ObjectId) => {
    await checklistRepository.delete(_id);
    console.table({msg: 'deu certo'});
  };

  const update = async (checklist: Checklist): Promise<Checklist> => {
    const newChecklist = await checklistRepository.update(checklist);

    return newChecklist;
  };

  return (
    <ChecklistContext.Provider
      value={{
        checklist,
        create,
        update,
        findAll,
        destroy,
        findById,
      }}>
      {children}
    </ChecklistContext.Provider>
  );
};

export function useChecklist() {
  const context = useContext(ChecklistContext);

  if (!context) {
    throw 'Checklist context null';
  }

  return context;
}
