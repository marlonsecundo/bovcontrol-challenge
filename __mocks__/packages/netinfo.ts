import '@testing-library/jest-dom';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: () => () => {},
}));
