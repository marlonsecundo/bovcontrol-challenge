import React, {createContext, useContext, useEffect, useState} from 'react';
import {useRealm} from './realm.context';
import ChecklistRepository from './repositories/checklist.repository';
import OfflineActionRepository from './repositories/offline-action.repository';

interface ProviderProps {
  children?: React.ReactNode;
}

interface RepositoryContextProps {
  checklistRepository: ChecklistRepository;
  offlineActionRepository: OfflineActionRepository;
}

const RepositoryContext = createContext<RepositoryContextProps>(null!);

export const RepositoryProvider: React.FC<ProviderProps> = ({children}) => {
  const realm = useRealm();
  const checklistRepository = new ChecklistRepository(realm);
  const offlineActionRepository = new OfflineActionRepository(realm);

  return (
    <RepositoryContext.Provider
      value={{checklistRepository, offlineActionRepository}}>
      {children}
    </RepositoryContext.Provider>
  );
};

export function useRepository() {
  const context = useContext(RepositoryContext);

  if (!context) {
    throw 'Repository context null';
  }

  return context;
}
