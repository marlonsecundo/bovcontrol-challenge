import React, {useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {useRepository} from '~/database/repository.context';
import {useChecklist} from '~/features/checklist/contexts/checklist.context';
import {useService} from '../contexts/service.context';
import {useIsOffline} from '../hooks/useIsOffline';

const ChecklistContextHandler: React.FC = () => {
  const {checklists, lastEvent} = useChecklist();

  const isOffline = useIsOffline();

  const {checklistService} = useService();
  const {checklistRepository, offlineActionRepository} = useRepository();

  const syncDatabase = useCallback(async () => {
    if (!isOffline) {
      if (await offlineActionRepository.isEmpty()) {
        const checklists = await checklistService.findAll();
        await checklistRepository.emptyAndCreate(checklists ?? []);

        console.log('DATABASE SYNCED');
      }
    }
  }, [checklists, isOffline]);

  useEffect(() => {
    if (lastEvent.type === 'findAll') {
      syncDatabase();
    }
  }, [lastEvent]);
  return <></>;
};

export default ChecklistContextHandler;
