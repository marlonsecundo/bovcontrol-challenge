import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ListRenderItem, View} from 'react-native';
import Checklist from '../../../database/models/checklist';
import ChecklistCard from '../components/checklist-card';
import {useChecklist} from '../contexts/checklist.context';

const useFeedChecklistController = () => {
  const checklistContext = useChecklist();
  const {checklists} = checklistContext;
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = React.useState(false);

  const handleRenderItem: ListRenderItem<Checklist> = ({item}) => {
    return <ChecklistCard key={String(item._id)} checklist={item} />;
  };

  const onRefresh = async () => {
    setRefreshing(true);

    await checklistContext.findAll();

    setRefreshing(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checklistContext.findAll();
    });

    return unsubscribe;
  }, [navigation]);

  return {refreshing, checklists, setRefreshing, handleRenderItem, onRefresh};
};

export default useFeedChecklistController;
