import React, {createContext, useContext, useEffect, useState} from 'react';
import {useRepository} from '../../database/repository.context';
import API from '../services/api';
import ChecklistService from '../services/checklist.service';

interface ProviderProps {
  children?: React.ReactNode;
}

interface ServiceContextProps {
  checklistService: ChecklistService;
}

const ServiceContext = createContext<ServiceContextProps>(null!);

export const ServiceProvider: React.FC<ProviderProps> = ({children}) => {
  const api = new API();
  const checklistService = new ChecklistService(api);

  useEffect(() => {
    api.init();
  }, []);
  return (
    <ServiceContext.Provider value={{checklistService}}>
      {children}
    </ServiceContext.Provider>
  );
};

export function useService() {
  const context = useContext(ServiceContext);

  if (!context) {
    throw 'Service context null';
  }

  return context;
}
