import React from 'react';
import {RefreshControl} from 'react-native';
import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenContainer} from '../../../shared/components/screen-container';
import {Subtitle, Title} from '../../../shared/components/text';
import {Column, Spacer} from '../../../shared/styles/layout';
import FeedFooter from '../components/feed-footer';
import useFeedChecklistController from '../controllers/feed-checklist.controller';

const FeedChecklistScreen: React.FC = () => {
  const controller = useFeedChecklistController();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenContainer>
        <Column flx={1}>
          <Title>My checklist</Title>

          <Subtitle>{controller.checklists.length} in Total</Subtitle>

          <FlatList
            data={controller.checklists}
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

export default FeedChecklistScreen;
