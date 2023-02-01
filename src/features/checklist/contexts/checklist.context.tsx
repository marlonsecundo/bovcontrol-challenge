import React, {createContext, useCallback, useContext, useState} from 'react';
import Checklist from '../../../database/models/checklist';
import {useRepository} from '../../../database/repository.context';
import {useService} from '../../../shared/contexts/serivce.context';
import {useIsOffline} from '../../../shared/hooks/useIsOffline';

interface ProviderProps {
  children?: React.ReactNode;
}

interface ChecklistContextProps {
  checklists: Checklist[];

  create: (checklist: Checklist) => Promise<Checklist>;
  findAll: () => Promise<Checklist[]>;
  update: (checklist: Checklist) => Promise<Checklist>;
  destroy: (id: string) => void;
}

const ChecklistContext = createContext<ChecklistContextProps>(
  {} as ChecklistContextProps,
);

export const ChecklistProvider: React.FC<ProviderProps> = ({children}) => {
  const isOffline = useIsOffline();

  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const {checklistService} = useService();
  const {checklistRepository, offlineActionRepository} = useRepository();

  const findAll = async (): Promise<Checklist[]> => {
    let result: Checklist[] | null;

    if (isOffline) {
      let realmResult = await checklistRepository.findAll();

      result = Checklist.fromJSONList(realmResult);
    } else {
      result = await checklistService.findAll();
    }

    setChecklists(result ?? []);

    return result ?? [];
  };

  const create = async (checklist: Checklist): Promise<Checklist> => {
    let newChecklist: Checklist;

    if (isOffline) {
      newChecklist = Checklist.fromJSON(
        await checklistRepository.create(checklist),
      );

      await offlineActionRepository.create({
        payload: newChecklist.convertToJSON(),
        syncStatus: 'waiting',
        type: 'create',
      });
    } else {
      newChecklist = await checklistService.create(checklist);
    }

    setChecklists([...checklists, newChecklist]);

    return newChecklist;
  };

  const destroy = async (id: string) => {
    let status: number | null;
    if (isOffline) {
      status = await checklistRepository.delete(id);

      await offlineActionRepository.create({
        payload: {id},
        syncStatus: 'waiting',
        type: 'delete',
      });
    } else {
      status = await checklistService.delete(id);
    }

    if (status) {
      const result = checklists.filter(c => c.id !== id);

      setChecklists(result);
    }
  };

  const update = async (checklist: Checklist): Promise<Checklist> => {
    let updatedChecklist: Checklist;

    if (isOffline) {
      updatedChecklist = Checklist.fromJSON(
        await checklistRepository.update(checklist),
      );

      await offlineActionRepository.create({
        payload: updatedChecklist.convertToJSON(),
        syncStatus: 'waiting',
        type: 'update',
      });
    } else updatedChecklist = await checklistService.update(checklist);

    const result = checklists.map(c => {
      if (c.id === updatedChecklist.id) {
        return updatedChecklist;
      }

      return c;
    });

    setChecklists(result);

    return updatedChecklist;
  };

  return (
    <ChecklistContext.Provider
      value={{
        checklists,
        create: useCallback(create, [isOffline]),
        update: useCallback(update, [isOffline]),
        findAll: useCallback(findAll, [isOffline]),
        destroy: useCallback(destroy, [isOffline]),
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
