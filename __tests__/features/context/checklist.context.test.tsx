import 'react-native';
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  RenderResult,
  waitFor,
} from '@testing-library/react-native';
import styled from 'styled-components/native';
import '@testing-library/jest-dom';
import '~/../__mocks__/packages/netinfo';

/**
 * Mocks
 */
import {spyOnUseIsOffline} from '~/shared/hooks/__mocks__/useIsOffline.mock';
import '~/shared/services/__mocks__/checklist.service.mock';
import '~/database/repositories/__mocks__/checklist.respository.mock';

import '~/database/__mocks__/repository.context.mock';
import '~/shared/contexts/__mocks__/service.context.mock';

/** */
import {
  ChecklistProvider,
  useChecklist,
} from '~/features/checklist/contexts/checklist.context';
import {Button} from 'react-native';

import {checklistMock} from '~/database/models/__mocks__/checklist.mock';
import Checklist from '~/database/models/checklist';

const TestComponent: React.FC = () => {
  const CustomView = styled.View``;
  const checklistContext = useChecklist();

  return (
    <CustomView
      testID="test-view"
      checklists={checklistContext.checklists}
      create={checklistContext.create}
      update={checklistContext.update}
      findAll={checklistContext.findAll}
      destroy={checklistContext.destroy}>
      <Button
        title=""
        testID="create-button"
        onPress={() => checklistContext.create(checklistMock)}></Button>
      <Button
        title=""
        testID="update-button"
        onPress={() =>
          checklistContext.update(
            Checklist.fromJSON({
              ...checklistMock,
              hadSupervision: true,
            }),
          )
        }></Button>
    </CustomView>
  );
};

describe('<ChecklistProvider /> Online Mode', () => {
  const testViewID = 'test-view';

  beforeAll(() => {
    spyOnUseIsOffline(false);
  });

  beforeEach(() => {});

  it('provides expected ChecklistContext to child elements', () => {
    // arrange

    // act
    const {getByTestId, container, debug} = render(
      <ChecklistProvider>
        <TestComponent></TestComponent>,
      </ChecklistProvider>,
    );
    const testView = getByTestId(testViewID);

    // assert
    expect(testView.props).toHaveProperty('checklists', []);
    expect(testView.props).toHaveProperty('create', expect.any(Function));
    expect(testView.props).toHaveProperty('update', expect.any(Function));
    expect(testView.props).toHaveProperty('findAll', expect.any(Function));
    expect(testView.props).toHaveProperty('destroy', expect.any(Function));
  });

  it('should create a new checklist', async () => {
    // arrange
    let renderer!: RenderResult;

    // act

    await act(async () => {
      await waitFor(() => {
        renderer = render(
          <ChecklistProvider>
            <TestComponent></TestComponent>,
          </ChecklistProvider>,
        );

        const {getByTestId} = renderer;

        const createButton = getByTestId('create-button');

        fireEvent.press(createButton);
      });
    });

    const {debug, getByTestId} = renderer;
    const testView = getByTestId(testViewID);

    // assert
    expect(testView.props['checklists']).toContain(checklistMock);
  });
});
