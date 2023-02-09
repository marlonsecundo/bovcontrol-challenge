import React, {createContext, useCallback, useContext, useState} from 'react';
import {useService} from '~/shared/contexts/service.context';
import {useIsOffline} from '~/shared/hooks/useIsOffline';
import Checklist from '../../../database/models/checklist';
import {OfflineAction} from '../../../database/models/offline-action';
import {useRepository} from '../../../database/repository.context';

export interface ChecklistProviderProps {
  children?: React.ReactNode;
  initialChecklists?: Checklist[];
}

type ChecklistEvent = {
  type: 'findAll' | 'create' | 'delete' | 'update' | 'none';
  time: Date;
};

interface ChecklistContextProps {
  checklists: Checklist[];

  create: (checklist: Checklist) => Promise<Checklist>;
  findAll: () => Promise<Checklist[]>;
  update: (checklist: Checklist) => Promise<Checklist>;
  destroy: (checklist: Checklist) => Promise<void>;
  lastEvent: ChecklistEvent;
}

const ChecklistContext = createContext<ChecklistContextProps>(null!);

export const ChecklistProvider: React.FC<ChecklistProviderProps> = ({
  children,
  initialChecklists = [],
}) => {
  const isOffline = useIsOffline();

  const [checklists, setChecklists] = useState<Checklist[]>(initialChecklists);
  const {checklistService} = useService();
  const {checklistRepository, offlineActionRepository} = useRepository();
  const [lastEvent, setLastEvent] = useState<ChecklistEvent>({
    type: 'none',
    time: new Date(),
  });

  const findAll = async (): Promise<Checklist[]> => {
    let result: Checklist[] | null;

    if (isOffline) {
      let realmResult = await checklistRepository.findAll();
      result = Checklist.fromJSONList(realmResult);
    } else {
      result = await checklistService.findAll();
    }

    setChecklists(result ?? []);

    setLastEvent({type: 'findAll', time: new Date()});
    return result ?? [];
  };

  const create = async (checklist: Checklist): Promise<Checklist> => {
    let newChecklist: Checklist;

    if (isOffline) {
      newChecklist = Checklist.fromJSON(
        await checklistRepository.create(checklist),
      );

      await offlineActionRepository.create(
        OfflineAction.fromJSON({
          payload: newChecklist.convertToJSON(),
          syncStatus: 'waiting',
          type: 'create',
        }),
      );
    } else {
      newChecklist = await checklistService.create(checklist);
      await checklistRepository.create(newChecklist);
    }

    setChecklists([...checklists, newChecklist]);
    setLastEvent({type: 'create', time: new Date()});

    return newChecklist;
  };

  const update = async (checklist: Checklist): Promise<Checklist> => {
    let updatedChecklist: Checklist;

    updatedChecklist = Checklist.fromJSON(
      await checklistRepository.update(checklist),
    );

    if (isOffline) {
      await offlineActionRepository.create(
        OfflineAction.fromJSON({
          payload: updatedChecklist.convertToJSON(),
          syncStatus: 'waiting',
          type: 'update',
        }),
      );
    } else {
      updatedChecklist = await checklistService.update(checklist);
    }

    const result = checklists.map(c => {
      if (c.id === updatedChecklist.id) {
        return updatedChecklist;
      }

      return c;
    });

    setChecklists(result);
    setLastEvent({type: 'update', time: new Date()});
    return updatedChecklist;
  };

  const destroy = async (checklist: Checklist) => {
    let status: number | null;

    status = await checklistRepository.softDelete(checklist);

    if (isOffline) {
      await offlineActionRepository.create(
        OfflineAction.fromJSON({
          payload: checklist.convertToJSON(),
          syncStatus: 'waiting',
          type: 'delete',
        }),
      );
    } else {
      status = await checklistService.delete(checklist);
      await checklistRepository.delete(checklist);
    }

    if (status) {
      const result = checklists.filter(c => c.id !== checklist.id);

      setChecklists(result);
      setLastEvent({type: 'delete', time: new Date()});
    }
  };

  return (
    <ChecklistContext.Provider
      value={{
        checklists,
        create: useCallback(create, [isOffline]),
        update: useCallback(update, [isOffline]),
        findAll: useCallback(findAll, [isOffline]),
        destroy: useCallback(destroy, [isOffline]),
        lastEvent,
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
