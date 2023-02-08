import '@testing-library/jest-dom';
import * as hooks from '../useIsOffline';

export function spyOnUseIsOffline(offline: boolean) {
  jest.spyOn(hooks, 'useIsOffline').mockImplementation(() => offline);
}
