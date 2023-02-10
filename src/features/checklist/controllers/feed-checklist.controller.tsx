import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ListRenderItem} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
import {Events} from '~/constants/Events';
import {useIsOffline} from '~/shared/hooks/useIsOffline';
import Checklist from '../../../database/models/checklist';
import ChecklistCard from '../components/checklist-card';
import {useChecklist} from '../contexts/checklist.context';

const useFeedChecklistController = () => {
  const checklistContext = useChecklist();
  const {checklists} = checklistContext;

  const [refreshing, setRefreshing] = React.useState(false);

  const handleRenderItem: ListRenderItem<Checklist> = ({item}) => {
    return <ChecklistCard key={String(item._id)} checklist={item} />;
  };

  const onRefresh = async () => {
    setRefreshing(true);

    await checklistContext.findAll();

    setRefreshing(false);
  };

  const offlineActionsDoneListener = () => {
    const listener = EventRegister.addEventListener(
      Events.offlineActions.DONE,
      () => {
        checklistContext.findAll();
      },
    );

    return () => {
      EventRegister.removeEventListener(listener.toString());
    };
  };

  useEffect(() => {
    checklistContext.findAll();

    const dispose = offlineActionsDoneListener();

    return () => {
      dispose();
    };
  }, []);

  return {
    refreshing,
    checklists,
    setRefreshing,
    handleRenderItem,
    onRefresh,
  };
};

export default useFeedChecklistController;
