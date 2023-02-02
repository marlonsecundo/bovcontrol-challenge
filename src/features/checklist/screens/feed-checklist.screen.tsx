import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ListRenderItem, RefreshControl} from 'react-native';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Checklist from '../../../database/models/checklist';
import {ScreenContainer} from '../../../shared/components/screen-container';
import {Subtitle, Title} from '../../../shared/components/text';
import {Column, Spacer} from '../../../shared/styles/layout';
import ChecklistCard from '../components/checklist-card';
import FeedFooter from '../components/feed-footer';
import {ChecklistProvider, useChecklist} from '../contexts/checklist.context';
import useFeedChecklistController from '../controllers/feed-checklist.controller';

const FeedChecklistScreen: React.FC = () => {
  const controller = useFeedChecklistController();

  const {checklists} = useChecklist();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenContainer>
        <Column flx={1}>
          <Title>My checklist</Title>
          <Subtitle>{checklists.length} in Total</Subtitle>

          <FlatList
            data={checklists}
            renderItem={controller.handleRenderItem}
            ListFooterComponent={<Spacer mb="70px"></Spacer>}
            refreshControl={
              <RefreshControl
                refreshing={controller.refreshing}
                onRefresh={controller.onRefresh}
              />
            }></FlatList>

          <FeedFooter></FeedFooter>
        </Column>
      </ScreenContainer>
    </SafeAreaView>
  );
};

export default () => (
  <ChecklistProvider>
    <FeedChecklistScreen></FeedChecklistScreen>
  </ChecklistProvider>
);
