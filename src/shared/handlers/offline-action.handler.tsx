import React, {useCallback, useEffect, useRef} from 'react';
import {View} from 'react-native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Checklist from '../../database/models/checklist';
import {OfflineAction} from '../../database/models/offline-action';
import {useRepository} from '../../database/repository.context';
import {SequentialTaskQueue} from '../../utils/promisse-queue';
import {useService} from '../contexts/service.context';

import {useIsOffline} from '../hooks/useIsOffline';

const OfflineActionHandler: React.FC = () => {
  const isOffline = useIsOffline();

  const queueRef = useRef(new SequentialTaskQueue([]));

  const {checklistService} = useService();

  const {offlineActionRepository, checklistRepository} = useRepository();

  const handleCreateAction = offAction => {
    const checklist = Checklist.fromJSON(offAction.payload);
    queueRef.current.add(async () => {
      const id = await checklistRepository.getIdBy_ID(checklist._id!);
      checklist.id = id ?? '-1';

      const newChecklist = await checklistService.create(checklist);
      await checklistRepository.update(newChecklist);
      await offlineActionRepository.delete(offAction._id);
    });
  };

  const handleUpdateAction = offAction => {
    const checklist = Checklist.fromJSON(offAction.payload);
    queueRef.current.add(async () => {
      const id = await checklistRepository.getIdBy_ID(checklist._id!);
      checklist.id = id ?? '-1';

      await checklistService.update(checklist);
      await offlineActionRepository.delete(offAction._id);
    });
  };

  const handleDeleteAction = offAction => {
    const checklist = Checklist.fromJSON(offAction.payload);

    queueRef.current.add(async () => {
      const id = await checklistRepository.getIdBy_ID(checklist._id!);
      checklist.id = id ?? '-1';

      await checklistService.delete(checklist);
      await checklistRepository.delete(checklist);
      await offlineActionRepository.delete(offAction._id);
    });
  };

  const handleOfflineActions = useCallback(async () => {
    const offlineActions = OfflineAction.fromJSONList(
      await offlineActionRepository.findAll(),
    );

    offlineActions.map(offAction => {
      switch (offAction.type) {
        case 'create':
          handleCreateAction(offAction);
          break;
        case 'update':
          handleUpdateAction(offAction);
          break;
        case 'delete':
          handleDeleteAction(offAction);
          break;
      }
    });

    await queueRef.current.run();
  }, [isOffline]);

  useEffect(() => {
    if (!isOffline) {
      queueRef.current.stop();
      queueRef.current.clear();
      handleOfflineActions();
    }
  }, [isOffline]);

  return <></>;
};

export default OfflineActionHandler;
