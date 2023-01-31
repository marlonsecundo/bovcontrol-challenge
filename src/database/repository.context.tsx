import React, { createContext, useContext, useEffect, useState } from "react";
import { useRealm } from "./realm.context";
import ChecklistRepository from "./repositories/checklist.repository";

interface ProviderProps {
  children?: React.ReactNode;
}

interface RepositoryContextProps {
  checklistRepository: ChecklistRepository;
}

const RepositoryContext = createContext<RepositoryContextProps>(
  {} as RepositoryContextProps
);

export const RepositoryProvider: React.FC<ProviderProps> = ({ children }) => {
  const realm = useRealm();
  const checklistRepository = new ChecklistRepository(realm);

  return (
    <RepositoryContext.Provider value={{ checklistRepository }}>
      {children}
    </RepositoryContext.Provider>
  );
};

export function useRepository() {
  const context = useContext(RepositoryContext);

  if (!context) {
    throw "Repository context null";
  }

  return context;
}
