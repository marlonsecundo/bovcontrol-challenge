import React, {useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
import {Events} from '~/constants/Events';
import {useRepository} from '~/database/repository.context';
import {useChecklist} from '~/features/checklist/contexts/checklist.context';
import {useService} from '../contexts/service.context';
import {useIsOffline} from '../hooks/useIsOffline';

const ChecklistContextHandler: React.FC = () => {
  const {checklists, lastEvent} = useChecklist();

  const isOffline = useIsOffline();

  const {checklistService} = useService();
  const {checklistRepository, offlineActionRepository} = useRepository();

  const syncDatabase = useCallback(
    async (fetch: boolean) => {
      if (!isOffline) {
        if (await offlineActionRepository.isEmpty()) {
          let data = fetch ? await checklistService.findAll() : checklists;

          await checklistRepository.emptyAndCreate(data ?? []);
        }
      }
    },
    [checklists, isOffline],
  );

  useEffect(() => {
    if (lastEvent.type === 'findAll') {
      syncDatabase(false);
    }
  }, [lastEvent]);

  useEffect(() => {}, []);
  return <></>;
};

export default ChecklistContextHandler;
